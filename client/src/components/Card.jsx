import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';

const Card = ({title, channel, views, time, thumbnail, avatar, onPress}) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      {/* Video Thumbnail */}
      <Image source={{uri: thumbnail}} style={styles.thumbnail} />

      {/* Details Row */}
      <View style={styles.detailsRow}>
        {/* Channel Avatar */}
        <Image source={{uri: avatar}} style={styles.avatar} />

        {/* Text Container */}
        <View style={styles.textContainer}>
          <Text style={styles.title} numberOfLines={2}>
            {title}
          </Text>
          <Text style={styles.subtitle} numberOfLines={1}>
            {channel} • {views} views • {time}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Card;

const styles = StyleSheet.create({
  card: {
    width: '100%',
    marginBottom: 25,
  },
  thumbnail: {
    width: '100%',
    height: 220,

    backgroundColor: '#ccc',
  },
  detailsRow: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  avatar: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    marginRight: 12,
    backgroundColor: '#ccc',
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 13,
    color: '#666',
  },
});
