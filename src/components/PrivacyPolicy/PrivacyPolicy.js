import React from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';

const PrivacyPolicyComponent = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>Privacy Policy</Text>
      <Text style={styles.paragraph}>
        This Privacy Policy describes how your personal information is collected,
        used, and shared when you visit or make a purchase from
        www.arphibo.com (the “e-Commerce WebSite”).
      </Text>

      <Text style={styles.heading}>2.Cookies</Text>
      <Text style={styles.paragraph}>
      We use data collection devices such as "cookies" on certain pages of the Platform to help analyse our web page flow, measure promotional effectiveness, and promote trust and safety. "Cookies" are small files placed on your hard drive that assist us in providing our services. Cookies do not contain any of your personal information. We offer certain features that are only available through the use of a "cookie". We also use cookies to allow you to enter your password less frequently during a session. Cookies can also help us provide information that is targeted to your interests. Most cookies are "session cookies," meaning that they are automatically deleted from your hard drive at the end of a session. You are always free to decline/delete our cookies if your browser permits, although in that case you may not be able to use certain features on the Platform and you may be required to re-enter your password more frequently during a session. Additionally, you may encounter "cookies" or other similar devices on certain pages of the Platform that are placed by third parties. We do not control the use of cookies by third parties.

We use cookies from third-party partners such as Google Analytics for marketing and analytical purposes.

Google Analytics help us understand how our customers use the site. You can read more about how Google uses your Personal Information here: https://www.google.com/intl/en/policies/privacy
You can also opt-out of Google Analytics here: https://tools.google.com/dlpage/gaoptout.
      </Text>
      <Text style={styles.heading}>3. SHARING OF PERSONAL INFORMATION:</Text>
      <Text style={styles.paragraph}>
      We may share personal information with our other corporate entities and affiliates for purposes of providing products and services offered by them. These entities and affiliates may share such information with their affiliates, business partners and other third parties for the purpose of providing you their products and services, and may market to you as a result of such sharing unless you explicitly opt-out.

We may disclose your personal information to third parties, such as sellers, business partners, logistics courier partners. This disclosure may be required for us to provide you access to our products and services; for fulfilment of your orders & dispatches; for enhancing your experience; for providing feedback on products; to collect payments from you under CoD; to comply with our legal obligations; to conduct market research or surveys; to enforce our Terms of Use; to facilitate our marketing and advertising activities; to analyse data; for customer service assistance; to prevent, detect, mitigate, and investigate fraudulent or illegal activities related to our product and services. We do not disclose your personal information to third parties for their marketing and advertising purposes without your explicit consent.

We may disclose personal information if required to do so by law or in the good faith belief that such disclosure is reasonably necessary to respond to subpoenas, court orders, or other legal process. We may disclose personal information to law enforcement agencies, third party rights owners, or others in the good faith belief that such disclosure is reasonably necessary to: enforce our Terms of Use or Privacy Policy; respond to claims that an advertisement, posting or other content violates the rights of a third party; or protect the rights, property or personal safety of our users or the general public.

We and our affiliates will share / sell some or all of your personal information with another business entity should we (or our assets) plan to merge with, or be acquired by that business entity, or re-organization, amalgamation, restructuring of business. Should such a transaction occur that other business entity (or the new combined entity) will be required to follow this Privacy Policy with respect to your personal information.
      </Text>
      <Text style={styles.heading}>4.SECURITY PRECAUTIONS:</Text>
      <Text style={styles.paragraph}>
      We maintain reasonable physical, electronic and procedural safeguards to protect your information. Whenever you access your account information, we offer the use of a secure server. Once your information is in our possession we adhere to our security guidelines to protect it against unauthorized access. However, by using the Platform, the users accept the inherent security implications of data transmission over the internet and the World Wide Web which cannot always be guaranteed as completely secure, and therefore, there would always remain certain inherent risks regarding use of the Platform. Users are responsible for ensuring the protection of login and password records for their account.
      </Text>
      <Text style={styles.heading}>5.CHOICE/OPT-OUT:</Text>
      <Text style={styles.paragraph}>
      We provide all users with the opportunity to opt-out of receiving non-essential (promotional, marketing-related) communications after setting up an account with us. If you do not wish to receive promotional communications from us then please revert on email i.e. feedback.arphibo@gmail.com
      </Text>
      <Text style={styles.heading}>6. CHILDREN INFORMATION:</Text>
      <Text style={styles.paragraph}>
      We do not knowingly solicit or collect personal information from children under age of 18 and use of our Platform is available only to persons who can form a legally binding contract under the Indian Contract Act, 1872. If you are under the age of 18 years then you must use the Platform, application or services under the supervision of your parent, legal guardian, or any responsible adult.
      </Text>
      <Text style={styles.heading}>7. DATA RETENTION:</Text>
      <Text style={styles.paragraph}>
      We retain your personal information in accordance with applicable laws, for a period no longer than is required for the purpose for which it was collected or as required under any applicable law. However, we may retain data related to you if we believe it may be necessary to prevent fraud or future abuse or if required by law or for other legitimate purposes. We may continue to retain your data in anonymised form for analytical and research purposes.
      </Text>
      <Text style={styles.heading}>8. CHANGES TO THIS PRIVACY POLICY:</Text>
      <Text style={styles.paragraph}>
      Please check our Privacy Policy periodically for changes. We may update this Privacy Policy to reflect changes to our information practices. We may alert you to significant changes by posting the date our policy got last updated, placing a notice on our Platform, or by sending you an email when we are required to do so by applicable law.
      </Text>

      

      <Text style={styles.heading}>9. GRIEVANCE OFFICER::</Text>
      <Text style={styles.paragraph}>
      In accordance with Information Technology Act 2000 and rules made there under, the name and contact details of the Grievance Officer are provided below:
      </Text>

    

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    marginTop:20
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
    color:"black"
  },
  paragraph: {
    fontSize: 16,
    marginBottom: 10,
    color:"black"
  },
});

export default PrivacyPolicyComponent;
