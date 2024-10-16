// src/pages/Polcies.tsx
import React from 'react';
import { Box, Heading, Text } from '@chakra-ui/react';
import { useBrandColors } from '../components/generalUtils/theme';

const Policies: React.FC = () => {
  const { primary, background, accent, secondary, text } = useBrandColors();
  return (
    <Box textAlign="center" py={10} px={6}>
      <Heading as="h1" size="xl" mb={4}>
      Privacy Policy for Globeeta
      </Heading>
      <Text color={secondary} fontSize="lg">
        
      Last updated: Oct 16, 2024
      </Text>
      

      <Box textAlign="left">
        <Text fontSize="lg" mt={10} color={text}>
        1. Introduction
        Welcome to Globeeta. We value your privacy and are committed to protecting your personal data. This policy outlines how we collect, use, and safeguard your information when you interact with Globeeta.
        </Text>
      
        <Text fontSize="lg" mt={10} color={text}>
        2. Data Collection
We may collect the following types of data:

Personal Information: such as your name, email address, and any other contact details when you create an account or interact with Globeeta.
Usage Data: information about how you use the app, including pages visited, actions performed, and device information.
Cookies: we may use cookies or similar tracking technologies to enhance your user experience and app performance.
        </Text>
        <Text fontSize="lg" mt={10} color={text}>
        3. Use of Data
We use your data for the following purposes:

To provide and maintain the functionality of Globeeta.
To improve the app and user experience based on feedback and analytics.
To communicate with you about updates, notifications, and relevant news concerning Globeeta.
        </Text>
        <Text fontSize="lg" mt={10} color={text}>
        4. Data Security
We take reasonable security measures to protect your data from unauthorized access, alteration, or disclosure. However, no method of transmission over the internet or electronic storage is completely secure.
        </Text>
        <Text fontSize="lg" mt={10} color={text}>
        5. User Rights
You have the right to:

Access the personal data we hold about you.
Request corrections or deletions of your personal data.
Withdraw your consent to data processing at any time.
        </Text>
        <Text fontSize="lg" mt={10} color={text}>
        6. Third-Party Services
        Globeeta may contain links to third-party services or use third-party providers for functionalities such as analytics. These third-party services are not operated by us, and we are not responsible for their privacy practices.
        </Text>
        <Text fontSize="lg" mt={10} color={text}>
        7. Changes to This Policy
        We may revise this privacy policy from time to time. Any updates will be posted on this page, and we encourage you to review the policy regularly to stay informed.
        </Text>
        <Text fontSize="lg" mt={10} color={text}>
        8. Contact Us
If you have any questions or concerns about this privacy policy or your data, please contact us at Globeeta@example.com (No official contact information yet).
        </Text>
      </Box>

      <Box textAlign="center" py={10} px={6}>
  <Heading as="h1" size="xl" mb={4}>
    Terms and Conditions for Globeeta
  </Heading>
  <Text color={secondary} fontSize="lg">
    Last updated: Oct 16, 2024
  </Text>

  <Box textAlign="left">
    <Text fontSize="lg" mt={10} color={text}>
      1. Acceptance of Terms
      By accessing or using Globeeta (the "App"), you agree to be bound by these Terms and Conditions (the "Terms"). If you do not agree to these Terms, you may not use the App.
    </Text>

    <Text fontSize="lg" mt={10} color={text}>
      2. Use of the App
      You agree to use Globeeta in compliance with all applicable laws and regulations. You are responsible for any content you upload, share, or otherwise make available through the App. You must not:
      - Use the App for any unlawful purposes.
      - Impersonate any person or entity or falsely state or misrepresent your affiliation with a person or entity.
      - Distribute viruses, malicious code, or any software intended to damage or alter the functionality of the App.
    </Text>

    <Text fontSize="lg" mt={10} color={text}>
      3. User Accounts
      To access certain features of Globeeta, you may be required to create an account. You agree to:
      - Provide accurate and up-to-date information during registration.
      - Maintain the security of your account and be responsible for all activities that occur under your account.
      - Notify us immediately of any unauthorized use of your account.
    </Text>

    <Text fontSize="lg" mt={10} color={text}>
      4. Intellectual Property
      All content and materials available on Globeeta, including but not limited to logos, text, graphics, images, and software, are the property of Globeeta or its licensors and are protected by intellectual property laws. You are not permitted to use any of the content without prior written consent from Globeeta.
    </Text>

    <Text fontSize="lg" mt={10} color={text}>
      5. Termination
      We may terminate or suspend your access to Globeeta without notice if you violate these Terms or if we suspect any unauthorized or illegal activities. Upon termination, your right to use the App will immediately cease, and any data associated with your account may be deleted.
    </Text>

    <Text fontSize="lg" mt={10} color={text}>
      6. Limitation of Liability
      To the maximum extent permitted by law, Globeeta will not be liable for any indirect, incidental, or consequential damages arising from your use of or inability to use the App, including but not limited to damages for loss of data, business interruptions, or personal injury.
    </Text>

    <Text fontSize="lg" mt={10} color={text}>
      7. Disclaimer
      Globeeta is provided on an "as is" and "as available" basis. We make no warranties, expressed or implied, regarding the reliability, availability, or performance of the App. We do not guarantee that the App will be error-free, secure, or free from viruses.
    </Text>

    <Text fontSize="lg" mt={10} color={text}>
      8. Modifications to the Terms
      We reserve the right to modify these Terms at any time. Any changes will be posted on this page, and your continued use of Globeeta following the posting of changes signifies your acceptance of the revised Terms.
    </Text>

    <Text fontSize="lg" mt={10} color={text}>
      9. Governing Law
      These Terms are governed by and construed in accordance with the laws of Newfoundland & Labrador, Canada, without regard to its conflict of law principles.
    </Text>

    <Text fontSize="lg" mt={10} color={text}>
      10. Contact Information
      If you have any questions or concerns regarding these Terms, please contact us at Globeeta@example.com.
    </Text>
  </Box>
</Box>

    </Box>
  );
};

export default Policies;
