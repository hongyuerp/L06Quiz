import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Image,
  Button,
  Alert,
  StyleSheet,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';

// ---------- Reusable question component ----------
const QuizQuestion = ({ image, question, options, selected, onSelect }) => (
  <View style={styles.card}>
    <Image source={image} style={styles.image} resizeMode="cover" />
    <Text style={styles.question}>{question}</Text>
    <View style={styles.pickerWrapper}>
      <Picker selectedValue={selected} onValueChange={onSelect}>
        <Picker.Item label="Select an item..." value="" enabled={false} />
        {options.map((opt) => (
          <Picker.Item key={opt} label={opt} value={opt} />
        ))}
      </Picker>
    </View>
  </View>
);

// ---------- Quiz data ----------
// Uses images in an "assets" folder and update the file names below.
const QUESTIONS = [
  {
    id: 1,
    image: require('./assets/tetris.jpg'),
    question: 'What game is this?',
    options: ['Bingo', 'Tetris', 'Snake & Ladder'],
    answer: 'Tetris',
  },
  {
    id: 2,
    image: require('./assets/word search.png'),
    question: 'What game is this?',
    options: ['Word Search', 'Uno', 'Chess'],
    answer: 'Word Search',
  },
  {
    id: 3,
    image: require('./assets/monopoly.jpg'),
    question: 'What game is this?',
    options: ['Tetris', 'Bingo', 'Monopoly'],
    answer: 'Monopoly',
  },
];

export default function App() {
  const [answers, setAnswers] = useState({}); // { questionId: chosenValue }

  const handleSelect = (id, value) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = () => {
    const score = QUESTIONS.filter((q) => answers[q.id] === q.answer).length;
    const total = QUESTIONS.length;

    let message;
    if (score === total) message = 'Well done! Perfect score!';
    else if (score >= total / 2) message = 'Good effort! Almost there.';
    else message = 'You can do better next time.';

    Alert.alert('Quiz Result', `You have ${score} / ${total} correct answers!\n\n${message}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>🎮 Game Quiz</Text>

      <ScrollView>
        {QUESTIONS.map((q) => (
          <QuizQuestion
            key={q.id}
            image={q.image}
            question={q.question}
            options={q.options}
            selected={answers[q.id] || ''}
            onSelect={(value) => handleSelect(q.id, value)}
          />
        ))}
      </ScrollView>

      <Button title="Submit Answers" onPress={handleSubmit} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', paddingTop: 30 },
  title: { fontSize: 28, fontWeight: 'bold', padding: 12 },
  card: { marginBottom: 12 },
  image: { width: '100%', height: 250 },
  question: { fontSize: 12, color: '#666', paddingHorizontal: 12, paddingTop: 6 },
  pickerWrapper: { backgroundColor: '#f0f0f0', marginHorizontal: 0 },
});