import React, {useEffect, useState} from 'react';
import {StyleSheet, FlatList, Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Header from '../components/Header';
import Card from '../components/Card';
import {fetchVideos} from '../services/apiService';

export default function HomeScreens({navigation}) {
  const [videos, setVideos] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const loadVideos = async () => {
    const results = await fetchVideos();
    setVideos(results);
  };

  useEffect(() => {
    loadVideos();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await loadVideos();
    setRefreshing(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      {videos.length === 0 && (
        <Text style={{textAlign: 'center', marginTop: 20}}>
          No videos found
        </Text>
      )}
      <FlatList
        data={videos}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <Card
            title={item.snippet.title}
            channel={item.snippet.channelTitle}
            views={item.statistics?.viewCount || 'N/A'}
            time={item.snippet.publishedAt}
            thumbnail={item.snippet.thumbnails.medium.url}
            avatar={item.snippet.thumbnails.default.url}
            onPress={() => navigation.navigate('Video', {video: item})}
          />
        )}
        refreshing={refreshing}
        onRefresh={onRefresh}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#fff'},
});
