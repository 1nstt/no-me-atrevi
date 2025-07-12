// Lista de palabras ofensivas
const OFFENSIVE_WORDS = [
    'perra', 'zorra', 'maraka', 'puta', 'hija de puta', 'idiota', 'imbécil', 'estúpido',
    'ql', 'culiada', 'ctm', 'conchadesumadre', 'concha de tu madre','hijo de puta', 'mierda','matate',
];

// Función para detectar palabras ofensivas
export const containsOffensiveWords = (text) => {
    if (!text || typeof text !== 'string') return false;
    
    const normalizedText = text.toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, ""); // Remover acentos
    
    return OFFENSIVE_WORDS.some(word => 
        normalizedText.includes(word.toLowerCase())
    );
};

// Función para obtener las palabras ofensivas encontradas
export const getOffensiveWords = (text) => {
    if (!text || typeof text !== 'string') return [];
    
    const normalizedText = text.toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
    
    return OFFENSIVE_WORDS.filter(word => 
        normalizedText.includes(word.toLowerCase())
    );
};

// Middleware para validar contenido antes de crear/actualizar
export const validateContent = (req, res, next) => {
    const { to, message } = req.body;
    
    const hasOffensiveContent = 
        containsOffensiveWords(to) || 
        containsOffensiveWords(message);
    
    if (hasOffensiveContent) {
        const offensiveWordsInTo = getOffensiveWords(to);
        const offensiveWordsInMessage = getOffensiveWords(message);
        
        return res.status(400).json({
            message: "El contenido contiene palabras no permitidas",
            offensiveWords: {
                to: offensiveWordsInTo,
                message: offensiveWordsInMessage
            }
        });
    }
    
    next();
};

// Exportar la lista de palabras si necesitas acceso directo
export { OFFENSIVE_WORDS };