const apiKey = import.meta.env.VITE_OPENAI_KEY

const languageCodes = {
  'pt-BR': 'pt-BR',
  en: 'en',
  es: 'es',
  fa: 'fa',
  it: 'it',
}

const getSpeechVoice = (language, gender) => {
  const voices = window.speechSynthesis.getVoices()
  const normalizedLanguage = (language || 'fa-IR').toLowerCase()
  const baseLanguage = normalizedLanguage.split('-')[0]

  const matchingVoices = voices.filter((voice) => voice.lang.toLowerCase().startsWith(baseLanguage))
  if (!matchingVoices.length) return undefined

  const genderTerms = gender === 'male' ? ['male', 'man', 'masculine', 'homem'] : ['female', 'woman', 'feminine', 'mulher']
  const preferredVoice =
    matchingVoices.find((voice) => voice.lang.toLowerCase() === normalizedLanguage) ||
    matchingVoices.find((voice) => genderTerms.some((term) => voice.name.toLowerCase().includes(term))) ||
    matchingVoices[0]

  return preferredVoice
}

// A transliteração é APENAS apoio visual. O TTS recebe sempre o texto original.
// Não converta o texto para transliteração antes de falar.

const localTranslations = {
  hello: 'olá',
  'how are you': 'como você está?',
  obrigado: 'thank you',
  'good morning': 'bom dia',
  hola: 'olá',
  ciao: 'olá',
}

const persianPronunciations = {
  'تو خورشیدی که دنیای مرا روشن می‌کنی.': 'To khorshidi ke donyaye mara roshan mikoni',
  'تو خورشیدی هستی که دنیای مرا روشن می‌کنی.': 'To khorshidi hasti ke donyaye mara roshan mikoni',
  'تو دلیل هر سپیده‌دم هستی،': 'To dalil-e har sepededam hasti,',
  'تو دلیل هر سپیده‌دم هستی': 'To dalil-e har sepededam hasti',
  'الناز': 'Elnaz',
  'الناز، صبح بخیر، عشق عمیق من،': 'Elnaz, sobh bekhir, eshgh-e amigh-e man,',
  'الناز، صبح بخیر، عشق عمیق من': 'Elnaz, sobh bekhir, eshgh-e amigh-e man',
  'ایستگاه کجاست؟': 'Istgâh kojâst?',
  'لطفاً آب می‌خواهم.': 'Lotfan âb mikhâham.',
  'اسمتان چیست؟': 'Esmatân chist?',
  'این چقدر است؟': 'In cheghadr ast?',
  'متوجه نمی‌شوم.': 'Motavajjeh nemishavam.',
  'لطفاً تکرار می‌کنید؟': 'Lotfan tekrar mikonid?',
  'دستشویی کجاست؟': 'Dastshuyi kojâst?',
  'تا فردا!': 'Tâ fardâ!',
  'سلام': 'Salam',
  'صبح بخیر': 'sobh bekhir',
  'عشق عمیق من': 'eshgh-e amigh-e man',
}

const farsiFallbackTranslations = {
  'olá': 'سلام',
  'bom dia': 'صبح بخیر',
  'obrigado': 'سپاسگزارم',
  'como você está?': 'حال شما چطور است؟',
  'não entendo': 'من نمی‌فهمم',
  'pode repetir, por favor?': 'لطفاً دوباره تکرار کنید؟',
  'até amanhã!': 'تا فردا!',
  'onde fica a estação?': 'ایستگاه کجاست؟',
  'eu gostaria de água, por favor.': 'لطفاً آب می‌خواهم.',
  'como você se chama?': 'اسم شما چیست؟',
  'quanto custa isso?': 'این چقدر است؟',
  'eu não entendo.': 'من نمی‌فهمم.',
  'onde fica o banheiro?': 'دستشویی کجاست؟',
  'eu gostaria de explicar o que aconteceu.': 'من می‌خواهم توضیح بدهم چه اتفاقی افتاده است.',
  'venha comigo': 'با من بیا',
  'onde você está?': 'شما کجا هستید؟',
  'posso ajudar?': 'می‌توانم کمک کنم؟',
  'meu nome é luis': 'اسم من لوئیس است',
  'meu nome é luís': 'اسم من لوئیس است',
  'good morning': 'صبح بخیر',
  'thank you': 'سپاسگزارم',
  'bom dia, meu amor profundo, tu és o sol que ilumina o meu mundo': 'صبح بخیر، عشق عمیق من، تو خورشیدی که دنیای مرا روشن می‌کنی.',
  'bom dia, meu amor profundo, tu és o sol que ilumina o meu mundo,': 'صبح بخیر، عشق عمیق من، تو خورشیدی هستی که دنیای مرا روشن می‌کنی.',
  'bom dia, meu amor profundo, tu és o sol que ilumina o meu mundo!': 'صبح بخیر، عشق عمیق من، تو خورشیدی هستی که دنیای مرا روشن می‌کنی.',
}

const persianLetters = {
  ا: 'a', آ: 'â', ب: 'b', پ: 'p', ت: 't', ث: 's', ج: 'j', چ: 'ch', ح: 'h', خ: 'kh',
  د: 'd', ذ: 'z', ر: 'r', ز: 'z', ژ: 'zh', س: 's', ش: 'sh', ص: 's', ض: 'z', ط: 't',
  ظ: 'z', ع: '', غ: 'gh', ف: 'f', ق: 'gh', ک: 'k', گ: 'g', ل: 'l', م: 'm', ن: 'n',
  و: 'v', ه: 'h', ی: 'i', ئ: 'y', ء: '', '‌': ' ',
}

export const transliteratePersian = (text) => {
  const exact = persianPronunciations[text.trim()]
  if (exact) return exact
  return text.split('').map((character) => persianLetters[character] ?? character).join('').replace(/\s+/g, ' ').trim()
}

const normalizeTranslationLookup = (value) => String(value || '')
  .normalize('NFD')
  .replace(/[\u0300-\u036f]/g, '')
  .toLowerCase()
  .replace(/[^\p{L}\p{N}\s]/gu, ' ')
  .replace(/\s+/g, ' ')
  .replace(/\n/g, ' ')
  .trim()

// Limpa artefatos comuns que a API pode devolver (entidades HTML, aspas, prefixos)
const cleanTranslatedText = (value) => {
  if (!value) return ''
  return String(value)
    .replace(/&#10;/g, '\n')
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/^\s*["'`]+|["'`]+\s*$/g, '')
    .replace(/^(Tradução|Translation|ترجمه)\s*:\s*/i, '')
    .trim()
}

export async function translateText(text, from, to) {
  if (!text.trim()) throw new Error('Digite um texto para traduzir.')

  const sourceCode = languageCodes[from] || from
  const targetCode = languageCodes[to] || to

  // 1. Tenta a API da OpenAI primeiro (tradução real, sem misturar idiomas)
  if (apiKey) {
    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [
            {
              role: 'system',
              content: `Você é um tradutor profissional. Traduza o texto do usuário do idioma "${sourceCode}" para o idioma "${targetCode}". Regras obrigatórias:
- Responda APENAS com a tradução, sem aspas, sem comentários, sem rótulos como "Tradução:".
- Preserve quebras de linha reais (\\n), nunca use entidades HTML como &#10;.
- Se o idioma de destino for persa (fa), use escrita persa correta e completa.
- Nunca misture palavras do idioma de origem no resultado.`,
            },
            { role: 'user', content: text },
          ],
          temperature: 0.2,
        }),
      })
      if (response.ok) {
        const data = await response.json()
        const raw = data.choices?.[0]?.message?.content
        const translated = cleanTranslatedText(raw)
        if (translated) return translated
      }
    } catch {
      // segue para o próximo método
    }
  }

  // 2. Tenta a API MyMemory (gratuita) como alternativa
  try {
    const params = new URLSearchParams({
      q: text.trim(),
      langpair: `${sourceCode}|${targetCode}`,
    })
    const response = await fetch(`https://api.mymemory.translated.net/get?${params.toString()}`, {
      headers: { Accept: 'application/json' },
    })
    if (response.ok) {
      const data = await response.json()
      const translated = cleanTranslatedText(data.responseData?.translatedText)
      if (translated && translated.toLowerCase() !== text.trim().toLowerCase()) return translated
    }
  } catch {
    // segue para o fallback local
  }

  // 3. Último recurso: fallback local apenas para frases exatas já cadastradas
  if (targetCode === 'fa') {
    const normalized = normalizeTranslationLookup(text)
    const exact = farsiFallbackTranslations[normalized]
    if (exact) return exact
  }

  return localTranslations[text.toLowerCase().trim()] || text
}

export const speak = (text, lang, rate = 1, gender = 'female') => {
  if (!('speechSynthesis' in window)) throw new Error('Seu navegador não oferece síntese de voz.')

  const normalizedLanguage = lang || 'fa-IR'
  const voice = getSpeechVoice(normalizedLanguage, gender)

  window.speechSynthesis.cancel()

  // CORRIGIDO: o TTS recebe o texto original (no idioma de destino).
  // A transliteração é APENAS exibida na tela e NUNCA vai para o motor de fala.
  const utterance = new SpeechSynthesisUtterance(text)
  utterance.lang = normalizedLanguage
  utterance.rate = rate
  utterance.voice = voice || null

  window.speechSynthesis.speak(utterance)
}