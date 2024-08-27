// Configuration du bot Telegram
const TELEGRAM_BOT_TOKEN = '6406546159:AAGPez2SBvBk_Z9w8VXd63gL8Z23zjHhFEM';
const TELEGRAM_CHAT_ID = '-1002174089598'; // Remplacez par l'ID de votre canal

// Fonction pour vérifier si l'identifiant est présent dans le canal
async function isIdInChannel(userId) {
    const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/getUpdates`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (response.ok) {
            const messages = data.result;

            for (const message of messages) {
                if (message.channel_post && message.channel_post.chat.id == TELEGRAM_CHAT_ID) {
                    const text = message.channel_post.text;
                    if (text.includes(userId)) {
                        return true;
                    }
                }
            }
        } else {
            console.error('Erreur lors de la récupération des messages:', data);
        }
    } catch (error) {
        console.error('Erreur lors de la vérification de l\'ID:', error);
    }

    return false;
}

// Fonction pour gérer la connexion
async function login(event) {
    event.preventDefault(); // Empêche la soumission automatique du formulaire

    const idField = document.getElementById('userId');
    const resultDiv = document.getElementById('result');

    const userId = idField.value.trim();

    if (!userId) {
        resultDiv.innerText = 'Veuillez entrer votre identifiant.';
        resultDiv.style.color = 'red';
        return;
    }

    const isAuthorized = await isIdInChannel(`#${userId}`);

    if (isAuthorized) {
        resultDiv.innerText = 'Connexion réussie!';
        resultDiv.style.color = 'green';
        // Redirection vers la page suivante
        window.location.href = 'rocket.html'; // Remplacez par la vraie page de destination
    } else {
        resultDiv.innerText = 'Votre identifiant n\'a pas accès au logiciel';
        resultDiv.style.color = 'red';
    }
}
