function generateSecretKey(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_';
    let secretKey = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      secretKey += characters.charAt(randomIndex);
    }
    return secretKey;
  }
  
  const desiredSecretKeyLength = 11;  // Adjust the length as needed
  const generatedSecretKey = generateSecretKey(desiredSecretKeyLength);
  console.log('Generated Secret Key:', generatedSecretKey);
  