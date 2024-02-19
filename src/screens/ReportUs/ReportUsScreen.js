import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import GradientHeader from '../../components/HomePageComponents/Header';
import Mailer from 'react-native-mail';

const ReportUsScreen = ({navigation}) => {
  const [issueType, setIssueType] = useState('');
  const [description, setDescription] = useState('');

  const handleReportSubmit = () => {
    // Prepare the email content
    const emailBody = `
      Issue Type: ${issueType}
      Description: ${description}
    `;

    // Open the email app with pre-filled content
    Mailer.mail({
      subject: 'Bug Report / Feedback', // Subject of the email
      recipients: ['santosh.s@mavenberg.com', 'sushant.manglekar@mavenberg.com', 'vamsikrishna.challapalli@mavenberg.com'], // Array of email addresses
      body: emailBody,
      isHTML: false,
    }, (error, event) => {
      if (error) {
        console.error('Error opening email:', error);
      } else {
        console.log('Email opened successfully:', event);
      }
    });
  };

  return (
    <ScrollView style={styles.mainContainer}>
      <GradientHeader text="Report Us" navigation={navigation} />

      {/* Content */}
      <View style={styles.container}>
        <Text style={styles.label}>Select Issue Type</Text>
        <TextInput
          placeholder="E.g., Bug, Feedback, etc."
          style={styles.input}
          value={issueType}
          onChangeText={setIssueType}
          placeholderTextColor="black"
        />

        <Text style={styles.label}>Describe the Issue</Text>
        <TextInput
          placeholder="Please provide details..."
          multiline
          style={[styles.input, styles.descriptionInput]}
          value={description}
          onChangeText={setDescription}
          placeholderTextColor="black"
        />

        <TouchableOpacity
          style={styles.submitButton}
          onPress={handleReportSubmit}>
          <Text style={styles.submitButtonText}>Submit Report</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#F2F2F2',
  },
  header: {
    flexDirection: 'row',
    paddingTop: 45,
    paddingBottom: 10,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  headerIcon: {
    fontSize: 24,
    color: 'white',
    marginRight: 10,
  },
  headerTitleContainer: {
    flex: 1,
    alignItems: 'center', // Align the title in the center
  },
  headerTitle: {
    fontSize: 16,
    color: 'white',
    fontWeight: '600',
  },
  container: {
    flex: 1,
    padding: 20,
  },
  label: {
    fontSize: 14,
    marginBottom: 5,
    color: '#555',
  },
  input: {
    fontSize: 12,
    borderWidth: 1,
    borderColor: '#555',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginBottom: 15,
    color:"black"
  },
  descriptionInput: {
    height: 100,
    textAlignVertical: 'top',
    color:"black"
  },
  submitButton: {
    backgroundColor: '#496152',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default ReportUsScreen;