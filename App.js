import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Pressable, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { useState, useEffect } from 'react';


export default function App() {
  const [quotes, setQuotes] = useState([]);
  const [quoteColor, setQuoteColor] = useState("");

  let colors = ["#d62828", "#7b2cbf","#ff006e", "#2dc653", "#f0ead2"]

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

  useEffect(() => {
    setQuoteColor(colors[Math.floor(Math.random() * colors.length)])
  }, [quotes])

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.quoteCard}>
          <Text style={{color: quoteColor}}>{quotes.content}</Text>
          <TouchableOpacity>
            <Pressable
              style={styles.btn}
              onPress={getQuotes}>
                <Text style={styles.btnText}>REFRESH</Text>
            </Pressable>
          </TouchableOpacity>
        </View>
        <StatusBar style="auto" />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#8ecae6',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'android' ? 55 : 0,
  },
  quoteCard: {
    backgroundColor: '#023047',
    paddingHorizontal: 20,
    paddingVertical: 50,
    borderRadius: 20,
    borderColor: "#ffb703",
    borderLeftWidth: 4,
    borderRightWidth: 4,
    borderTopWidth: 4,
    borderBottomWidth : 4,
    flexDirection: 'column',
    alignItems: 'center'
  },
  btn: {
    width: 150,
    borderRadius: 10,
    marginTop: 25,
    backgroundColor: "#fb8500",
    padding: 10, 
  },
  btnText: {
    textAlign: 'center',
    color: "#fff",
    fontWeight: 'bold'
  },
  quoteText: {
    color: "#fff",
    fontWeight: 'bold'
  }
});

