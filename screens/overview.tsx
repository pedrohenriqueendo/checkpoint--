import React, { useState, useEffect } from 'react';
import {
  Image,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';

const Overview = ({ navigation }) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(
          'https://raw.githubusercontent.com/erik-sytnyk/movies-list/master/db.json'
        );
        const json = await response.json();
        setMovies(json.movies);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" />;
  }

  return (
    <FlatList
      data={movies}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={styles.movieContainer}
          onPress={() => navigation.navigate('Details', { movieDetails: item })}>
          {item.posterUrl ? <Image source={{ uri: item.posterUrl }} style={styles.image} /> : null}
          <Text style={styles.text}>{item.title}</Text>
        </TouchableOpacity>
      )}
    />
  );
};

export default Overview;

const styles = StyleSheet.create({
  movieContainer: {
    marginHorizontal: 32,
    marginVertical: 10,
    padding: 16,
    borderColor: 'black',
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  image: { width: 100, height: 100 },
  text: { marginLeft: 8 },
});