import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Pressable, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { useState, useEffect } from 'react';



export default function App() {
  const [quotes, setQuotes] = useState([]);
  // const [quoteColor, setQuoteColor] = useState("");

  // let colors = ["#d62828", "#7b2cbf","#ff006e", "#2dc653", "#f0ead2"]

  const getQuotes = () => fetch('https://quotable.io/quotes')
    .then(response => response.json())
    .then(data => {
      let randomQuote = Math.floor(Math.random() * data.results.length);
      setQuotes(data.results[randomQuote])
    }
    );

  useEffect(() => {
    getQuotes()
  }, [])

  // useEffect(() => {
  //   setQuoteColor(colors[Math.floor(Math.random() * colors.length)])
  // }, [quotes])

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Random Quote</Text>
        </View>
        <View style={styles.quoteCard}>
          <Text style={styles.cardContent}>{quotes.content}</Text>
          <Text style={styles.cardAuthor}>- {quotes.author}</Text>
          <View style={styles.tagBtnContainer}>
            <TouchableOpacity style={styles.tagBtn}>
              <Text style={styles.cardContent}>tag-1</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.tagBtn}>
              <Text style={styles.cardContent}>famous-tags</Text>
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity>
          <Pressable
            style={styles.refreshBtn}
            onPress={getQuotes}>
            <Text style={styles.refreshBtnText}>Bring me a new quote</Text>
          </Pressable>
        </TouchableOpacity>
        <StatusBar backgroundColor="#767c96" style="auto" />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eff1f8',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 0,
    paddingTop: Platform.OS === 'android' ? 24 : 0,
  },
  quoteCard: {
    backgroundColor: '#767c96',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 10,
    marginHorizontal: 0,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  refreshBtn: {
    width: 300,
    borderRadius: 30,
    marginTop: 25,
    backgroundColor: "#687089",
    paddingVertical: 10,
    paddingHorizontal: 30,
    alignSelf: 'center'
  },
  refreshBtnText: {
    textAlign: 'center',
    color: "#eff1f8",
    fontWeight: 'bold',
  },
  quoteText: {
    color: "#fff",
    fontWeight: 'bold',
  },
  title: {
    color: "#eff1f8",
    textAlign: 'center',
    fontSize: 20
  },
  titleContainer: {
    paddingTop: 15,
    paddingBottom: 15,
    backgroundColor: "#767c96",
    borderColor: "#8e94a8",
    borderTopWidth: 3,
    borderBottomWidth: 3,
  },
  cardContent: {
    textAlign: 'center',
    color: "#eff1f8",
  },
  cardAuthor: {
    color: "#eff1f8",
    marginBottom: 60,
    marginTop: 20
  },
  tagBtnContainer: {
    flexDirection: 'row',
    alignSelf: 'flex-end'
  },
  tagBtn: {
    backgroundColor: "#959aad",
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginLeft: 10,
    shadowColor: '#000',
    shadowOpacity: 0.8,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    elevation: 5,
  },
});

