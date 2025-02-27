function capitalizeSentence(sentence) {
    if (!sentence) return sentence;
    return sentence
      .split(" ")
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }
  
export default capitalizeSentence