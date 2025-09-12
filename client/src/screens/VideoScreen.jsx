import React, {useRef, useState, useCallback} from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import YoutubePlayer from 'react-native-youtube-iframe';

const {width: screenWidth, height: screenHeight} = Dimensions.get('window');

export default function VideoScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const {video} = route.params;

  const videoId = video.id?.videoId || video.id;
  const playerRef = useRef(null);
  const [playing, setPlaying] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const onStateChange = useCallback(state => {
    if (state === 'ended') {
      setPlaying(false);
      console.log('Video finished');
    }
  }, []);

  const togglePlaying = useCallback(() => {
    setPlaying(prev => !prev);
  }, []);

  const onFullScreenChange = useCallback(isFullScreen => {
    setIsFullscreen(isFullScreen);
  }, []);

  // Calculate video height (25% of screen height)
  const videoHeight = screenHeight * 0.25;

  return (
    <SafeAreaView style={styles.container}>
      {/* Video Player Container - Fixed at top */}
      <View style={[styles.videoContainer, {height: videoHeight}]}>
        <YoutubePlayer
          ref={playerRef}
          height={videoHeight}
          width={screenWidth}
          play={playing}
          videoId={videoId}
          onChangeState={onStateChange}
          onFullScreenChange={onFullScreenChange}
          initialPlayerParams={{
            rel: false, // recomandation
            controls: true,
            showClosedCaptions: false,
            color: 'white',
            iv_load_policy: 3,
          }}
          webViewStyle={styles.webViewStyle}
        />
      </View>

      {/* Content Below Video */}
      <ScrollView
        style={styles.contentContainer}
        showsVerticalScrollIndicator={false}>
        {/* Video Info Section */}
        <View style={styles.videoInfoContainer}>
          <Text style={styles.videoTitle} numberOfLines={2}>
            {video.snippet?.title || 'Video Title'}
          </Text>

          <View style={styles.videoMetaContainer}>
            <Text style={styles.videoMeta}>
              {video.snippet?.channelTitle || 'Channel Name'}
            </Text>
            <Text style={styles.videoViews}>
              •{' '}
              {video.statistics?.viewCount
                ? `${parseInt(
                    video.statistics.viewCount,
                  ).toLocaleString()} views`
                : 'Views'}
            </Text>
          </View>

          {/* Action Buttons Row */}
          <View style={styles.actionButtonsContainer}>
            <TouchableOpacity style={styles.actionButton}>
              <Text style={styles.actionButtonText}>👍 Like</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionButton}>
              <Text style={styles.actionButtonText}>💾 Save</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionButton}>
              <Text style={styles.actionButtonText}>↗️ Share</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Video Description */}
        <View style={styles.descriptionContainer}>
          <Text style={styles.descriptionTitle}>Description</Text>
          <Text style={styles.descriptionText} numberOfLines={3}>
            {video.snippet?.description ||
              'No description available for this video.'}
          </Text>
          <TouchableOpacity>
            <Text style={styles.showMoreText}>Show more</Text>
          </TouchableOpacity>
        </View>

        {/* Comments Section Placeholder */}
        <View style={styles.commentsContainer}>
          <Text style={styles.commentsTitle}>Comments</Text>
          <Text style={styles.commentsPlaceholder}>
            Comments will appear here...
          </Text>
        </View>

        {/* Suggested Videos Placeholder */}
        <View style={styles.suggestedContainer}>
          <Text style={styles.suggestedTitle}>Up Next</Text>
          <Text style={styles.suggestedPlaceholder}>
            Suggested videos will appear here...
          </Text>
        </View>
      </ScrollView>

      {/* Back Button (Optional) */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>← Back</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f0f0f', // YouTube dark theme
  },
  videoContainer: {
    width: '100%',
    backgroundColor: '#000',
  },
  player: {
    alignSelf: 'stretch',
  },
  contentContainer: {
    flex: 1,
    backgroundColor: '#0f0f0f',
  },
  videoInfoContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  videoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    lineHeight: 24,
    marginBottom: 8,
  },
  videoMetaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  videoMeta: {
    fontSize: 14,
    color: '#aaa',
  },
  videoViews: {
    fontSize: 14,
    color: '#aaa',
    marginLeft: 4,
  },
  actionButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 8,
  },
  actionButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#333',
    borderRadius: 18,
    minWidth: 70,
    alignItems: 'center',
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '500',
  },
  descriptionContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  descriptionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  descriptionText: {
    fontSize: 14,
    color: '#ccc',
    lineHeight: 20,
    marginBottom: 8,
  },
  showMoreText: {
    fontSize: 14,
    color: '#3ea6ff', // YouTube blue
    fontWeight: '500',
  },
  commentsContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  commentsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 12,
  },
  commentsPlaceholder: {
    fontSize: 14,
    color: '#aaa',
    fontStyle: 'italic',
  },
  suggestedContainer: {
    padding: 16,
  },
  suggestedTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 12,
  },
  suggestedPlaceholder: {
    fontSize: 14,
    color: '#aaa',
    fontStyle: 'italic',
  },
  backButton: {
    position: 'absolute',
    top: 60, // Adjust based on your SafeAreaView
    left: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    zIndex: 10,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
});
