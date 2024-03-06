const characters = document.querySelectorAll('.characters img');
const modal = document.getElementById('modal');
const close = document.querySelector('.modal-close');
const message = document.querySelector('.message');
const input = document.querySelector('.input');
const actionModal = document.getElementById('action-modal');
const actionMessage = document.querySelector('.action-message');
const actionButtons = document.querySelector('.action-buttons');
const congratulations = [
  'Happy International Women’s Day! You are amazing and deserve to be celebrated today and every day.',
  'Wishing you a very happy Women’s Day! May you continue to inspire and empower those around you.',
  'Today is a day to recognize and honor the incredible women in our lives. Happy Women’s Day!',
  'You are strong, smart, and beautiful. Never forget that. Happy Women’s Day!',
  'Happy Women’s Day to a woman who is not only beautiful on the outside, but also has a heart of gold.',
  'You are an inspiration to all women. Keep shining and never give up on your dreams. Happy Women’s Day!',
  'On this Women’s Day, let us celebrate the achievements of women and continue to work towards gender equality. Happy Women’s Day!',
  'You are a wonderful example of strength, grace, and determination. Happy Women’s Day!',
  'You are a role model for all women. Your accomplishments are a testament to your hard work and dedication. Happy Women’s Day!',
  'Happy Women’s Day to a woman who is not only successful, but also kind and compassionate. You are truly one of a kind.'
];

const character = document.querySelectorAll('.character');

character.forEach(char => {
  char.addEventListener('click', e => {
    const name = e.target.closest('.character').dataset.name;
    const message = e.target.closest('.character').dataset.message;
    const dialogBox = e.target.closest('.character').querySelector('.dialog-box');
    const dialogText = dialogBox.querySelector('.dialog-text');
    const dialogInput = dialogBox.querySelector('.dialog-input');

    dialogBox.style.display = 'block';
    dialogText.textContent = `Hello, I'm ${name}!`;

    dialogInput.addEventListener('keydown', event => {
      if (event.key === 'Enter') {
        event.preventDefault();
        const userMessage = dialogInput.value;
        dialogInput.value = '';
        dialogText.textContent = `You: ${userMessage}`;

        fetch(message)
          .then(response => response.text())
          .then(data => {
            setTimeout(() => {
              dialogText.textContent = data;
            }, 1000);
          });
      }
    });
  });
});

close.addEventListener('click', () => {
  modal.classList.remove('is-active');
  actionModal.classList.remove('is-active');
});

input.addEventListener('keydown', e => {
  if (e.key === 'Enter') {
    const userResponse = input.value;
    input.value = '';
    message.textContent = userResponse;
    setTimeout(() => {
      const characterResponse = getCharacterResponse(selectedCharacter, userResponse);
      message.textContent = characterResponse;
    }, 1000);
  }
});

actionButtons.addEventListener('click', e => {
  if (e.target.tagName === 'BUTTON') {
    const action = e.target.dataset.action;
    actionModal.classList.remove('is-active');
    const characterResponse = getCharacterResponse(selectedCharacter, action);
    message.textContent = characterResponse;
    modal.classList.add('is-active');
  }
});

function getCharacterResponse(characterIndex, userResponse) {
  const responses = [
    [
      'Thank you! I’m glad you liked my message. How are you celebrating Women’s Day today?',
      'I’m sorry to hear that. Is there anything I can do to make your day better?',
      'That’s great! What are your plans for the rest of the day?',
      'I’m not sure about that. Can we talk about something else?',
      'I’m glad you asked! I’m a big fan of reading and writing. What about you?',
      'I’m sorry, I don’t understand. Can you please clarify?',
      'I’m glad you think so! What do you like most about me?',
      'I’m sorry if I upset you. That was not my intention.',
      'I’m glad we have that in common! What other hobbies do you enjoy?',
      'I’m not sure I follow. Can you please explain further?'
    ],
    [
      'Thank you! I’m glad you liked my message. What do you think about the importance of Women’s Day?',
      'I’m sorry to hear that. Is there anything I can do to make your day better?',
      'That’s great! What are your plans for the rest of the day?',
      'I’m not sure about that. Can we talk about something else?',
      'I’m glad you asked! I’m a big fan of music and art. What about you?',
      'I’m sorry, I don’t understand. Can you please clarify?',
      'I’m glad you think so! What do you like most about me?',
      'I’m sorry if I upset you. That was not my intention.',
      'I’m glad we have that in common! What other hobbies do you enjoy?',
      'I’m not sure I follow. Can you please explain further?'
    ],
    [
      'Thank you! I’m glad you liked my message. What do you think about the importance of Women’s Day?',
      'I’m sorry to hear that. Is there anything I can do to make your day better?',
      'That’s great! What are your plans for the rest of the day?',
      'I’m not sure about that. Can we talk about something else?',
      'I’m glad you asked! I’m a big fan of sports and fitness. What about you?',
      'I’m sorry, I don’t understand. Can you please clarify?',
      'I’m glad you think so! What do you like most about me?',
      'I’m sorry if I upset you. That was not my intention.',
      'I’m glad we have that in common! What other hobbies do you enjoy?',
      'I’m not sure I follow. Can you please explain further?'
    ]
  ];

  const randomIndex = Math.floor(Math.random() * responses[characterIndex].length);
  return responses[characterIndex][randomIndex];
}

function openActionModal() {
  actionModal.classList.add('is-active');
}

function getActionModalMessage(characterIndex) {
  const messages = [
    'What would you like to do?',
    'Choose an action:',
    'Select an option:'
  ];

  return messages[characterIndex];
}

characters.forEach((character, index) => {
  character.addEventListener('dblclick', () => {
    selectedCharacter = index;
    actionMessage.textContent = getActionModalMessage(index);
    openActionModal();
  });
});