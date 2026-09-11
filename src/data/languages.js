export const languages = [
  { code: 'pt-BR', name: 'Português', flag: '🇧🇷', speech: 'pt-BR' },
  { code: 'en', name: 'Inglês', flag: '🇺🇸', speech: 'en-US' },
  { code: 'es', name: 'Espanhol', flag: '🇪🇸', speech: 'es-ES' },
  { code: 'fa', name: 'Persa', flag: '🇮🇷', speech: 'fa-IR' },
  { code: 'it', name: 'Italiano', flag: '🇮🇹', speech: 'it-IT' },
]

export const languageByCode = (code) => languages.find((language) => language.code === code) || languages[0]

export const languageContent = {
  en: {
    alphabet: [['A', 'ei'], ['B', 'bi'], ['C', 'si'], ['D', 'di'], ['E', 'i'], ['F', 'ef'], ['G', 'dji'], ['H', 'eitch'], ['I', 'ai'], ['J', 'djei'], ['K', 'kei'], ['L', 'el'], ['M', 'em'], ['N', 'en'], ['O', 'ou'], ['P', 'pi'], ['Q', 'kiu'], ['R', 'ar'], ['S', 'es'], ['T', 'ti'], ['U', 'iu'], ['V', 'vi'], ['W', 'dâbliu'], ['X', 'eks'], ['Y', 'uai'], ['Z', 'zi']],
    numbers: [['1', 'one'], ['2', 'two'], ['3', 'three'], ['4', 'four'], ['5', 'five'], ['6', 'six'], ['7', 'seven'], ['8', 'eight'], ['9', 'nine'], ['10', 'ten']],
    grammar: [{ title: 'Present Simple', level: 'Iniciante', description: 'Use o presente simples para hábitos, rotinas e fatos.', example: 'I study every day. — Eu estudo todos os dias.', tag: 'Tempo verbal' }, { title: 'There is / There are', level: 'Iniciante', description: 'Use “there is” no singular e “there are” no plural para indicar existência.', example: 'There is a book on the table. — Há um livro na mesa.', tag: 'Estrutura' }, { title: 'Modal verbs', level: 'Intermediário', description: 'Can, should e must expressam habilidade, conselho e obrigação.', example: 'You should practice. — Você deveria praticar.', tag: 'Verbos' }],
  },
  es: {
    alphabet: [['A', 'a'], ['B', 'be'], ['C', 'ce'], ['D', 'de'], ['E', 'e'], ['F', 'efe'], ['G', 'ge'], ['H', 'ache'], ['I', 'i'], ['J', 'jota'], ['K', 'ka'], ['L', 'ele'], ['M', 'eme'], ['N', 'ene'], ['Ñ', 'eñe'], ['O', 'o'], ['P', 'pe'], ['Q', 'cu'], ['R', 'erre'], ['S', 'ese'], ['T', 'te'], ['U', 'u'], ['V', 'uve'], ['W', 'uve doble'], ['X', 'equis'], ['Y', 'i griega'], ['Z', 'zeta']],
    numbers: [['1', 'uno'], ['2', 'dos'], ['3', 'tres'], ['4', 'cuatro'], ['5', 'cinco'], ['6', 'seis'], ['7', 'siete'], ['8', 'ocho'], ['9', 'nueve'], ['10', 'diez']],
    grammar: [{ title: 'Presente do indicativo', level: 'Iniciante', description: 'Fale sobre ações que acontecem agora ou com frequência.', example: 'Yo estudio español. — Eu estudo espanhol.', tag: 'Tempo verbal' }, { title: 'Ser e estar', level: 'Iniciante', description: 'Ser indica características permanentes; estar indica estados temporários.', example: 'Soy brasileña. Estoy feliz. — Sou brasileira. Estou feliz.', tag: 'Verbos' }],
  },
  fa: {
    alphabet: [['ا', 'alef'], ['ب', 'be'], ['پ', 'pe'], ['ت', 'te'], ['ث', 'se'], ['ج', 'jim'], ['چ', 'che'], ['ح', 'he'], ['خ', 'khe'], ['د', 'dal'], ['ر', 're'], ['ز', 'ze'], ['س', 'sin'], ['ش', 'shin'], ['ص', 'sad'], ['ض', 'zad'], ['ط', 'ta'], ['ظ', 'za'], ['ع', 'eyn'], ['غ', 'gheyn'], ['ف', 'fe'], ['ق', 'ghaf'], ['ک', 'kaf'], ['گ', 'gaf'], ['ل', 'lam'], ['م', 'mim'], ['ن', 'nun'], ['و', 'vav'], ['ه', 'he'], ['ی', 'ye']],
    numbers: [['۱', 'yek'], ['۲', 'do'], ['۳', 'se'], ['۴', 'chahar'], ['۵', 'panj'], ['۶', 'shesh'], ['۷', 'haft'], ['۸', 'hasht'], ['۹', 'noh'], ['۱۰', 'dah']],
    grammar: [{ title: 'Ordem das palavras', level: 'Iniciante', description: 'No farsi iraniano, a ordem mais comum é sujeito + objeto + verbo. A tradução natural em português reorganiza a frase.', example: 'من کتاب می‌خوانم — Eu leio um livro.', pronunciation: 'Man ketâb mikhaanam', tag: 'Estrutura' }, { title: 'Ezafe', level: 'Intermediário', description: 'O som “-e” conecta substantivos a seus modificadores.', example: 'کتابِ خوب — O livro é bom.', pronunciation: 'Ketâb-e khub', tag: 'Conexão' }],
  },
  it: {
    alphabet: [['A', 'a'], ['B', 'bi'], ['C', 'ci'], ['D', 'di'], ['E', 'e'], ['F', 'effe'], ['G', 'gi'], ['H', 'acca'], ['I', 'i'], ['L', 'elle'], ['M', 'emme'], ['N', 'enne'], ['O', 'o'], ['P', 'pi'], ['Q', 'cu'], ['R', 'erre'], ['S', 'esse'], ['T', 'ti'], ['U', 'u'], ['V', 'vi'], ['Z', 'zeta']],
    numbers: [['1', 'uno'], ['2', 'due'], ['3', 'tre'], ['4', 'quattro'], ['5', 'cinque'], ['6', 'sei'], ['7', 'sette'], ['8', 'otto'], ['9', 'nove'], ['10', 'dieci']],
    grammar: [{ title: 'Artigos definidos', level: 'Iniciante', description: 'Il, lo, la, i, gli e le concordam com gênero e número.', example: 'La casa è bella. — A casa é bonita.', tag: 'Artigos' }, { title: 'Passato prossimo', level: 'Intermediário', description: 'Use avere ou essere + particípio para ações concluídas.', example: 'Ho studiato. — Eu estudei.', tag: 'Tempo verbal' }],
  },
  'pt-BR': {
    alphabet: [['A', 'á'], ['B', 'bê'], ['C', 'cê'], ['D', 'dê'], ['E', 'ê'], ['F', 'éfe'], ['G', 'gê'], ['H', 'agá'], ['I', 'i'], ['J', 'jóta'], ['K', 'cá'], ['L', 'éle'], ['M', 'ême'], ['N', 'êne'], ['O', 'ó'], ['P', 'pê'], ['Q', 'quê'], ['R', 'érre'], ['S', 'ésse'], ['T', 'tê'], ['U', 'u'], ['V', 'vê'], ['W', 'dáblio'], ['X', 'xis'], ['Y', 'ípsilon'], ['Z', 'zê']],
    numbers: [['1', 'um'], ['2', 'dois'], ['3', 'três'], ['4', 'quatro'], ['5', 'cinco'], ['6', 'seis'], ['7', 'sete'], ['8', 'oito'], ['9', 'nove'], ['10', 'dez']],
    grammar: [{ title: 'Presente do indicativo', level: 'Iniciante', description: 'Use para ações atuais, hábitos e fatos.', example: 'Eu estudo todos os dias.', tag: 'Tempo verbal' }],
  },
}

const exerciseLevels = {
  beginner: [
    ['Onde fica a estação?', 'Where is the station?'], ['Eu gostaria de água, por favor.', 'I would like water, please.'], ['Como você se chama?', 'What is your name?'], ['Quanto custa isso?', 'How much is this?'],
    ['Eu não entendo.', 'I do not understand.'], ['Pode repetir, por favor?', 'Can you repeat, please?'], ['Onde fica o banheiro?', 'Where is the bathroom?'], ['Até amanhã!', 'See you tomorrow!'],
  ],
  intermediate: [
    ['Você poderia recomendar um restaurante?', 'Could you recommend a restaurant?'], ['Estou aprendendo este idioma há seis meses.', 'I have been learning this language for six months.'], ['Preciso remarcar minha reserva.', 'I need to reschedule my reservation.'], ['Qual é a melhor maneira de chegar ao centro?', 'What is the best way to get downtown?'],
    ['Embora esteja cansado, vou continuar estudando.', 'Although I am tired, I will keep studying.'], ['Você sabe se o museu abre aos domingos?', 'Do you know if the museum opens on Sundays?'], ['Eu gostaria de explicar o que aconteceu.', 'I would like to explain what happened.'], ['A prática diária está melhorando minha pronúncia.', 'Daily practice is improving my pronunciation.'],
  ],
  advanced: [
    ['Se eu tivesse mais tempo, viajaria pelo país inteiro.', 'If I had more time, I would travel across the whole country.'], ['Acredito que aprender exige curiosidade constante.', 'I believe learning requires constant curiosity.'], ['Apesar dos desafios, conseguimos alcançar nosso objetivo.', 'Despite the challenges, we managed to reach our goal.'], ['Quando terminar o projeto, vou apresentar os resultados.', 'When I finish the project, I will present the results.'],
    ['É importante considerar diferentes pontos de vista.', 'It is important to consider different points of view.'], ['Eu teria escolhido outra abordagem se soubesse disso.', 'I would have chosen another approach if I had known that.'], ['A conversa foi mais produtiva do que eu esperava.', 'The conversation was more productive than I expected.'], ['Quanto mais pratico, mais natural a língua parece.', 'The more I practice, the more natural the language feels.'],
  ],
}

const localizedExercises = {
  es: ['¿Dónde está la estación?', 'Me gustaría agua, por favor.', '¿Cómo te llamas?', '¿Cuánto cuesta esto?', 'No entiendo.', '¿Puedes repetir, por favor?', '¿Dónde está el baño?', '¡Hasta mañana!'],
  fa: ['ایستگاه کجاست؟', 'لطفاً آب می‌خواهم.', 'اسمتان چیست؟', 'این چقدر است؟', 'متوجه نمی‌شوم.', 'لطفاً تکرار می‌کنید؟', 'دستشویی کجاست؟', 'تا فردا!'],
  it: ['Dov’è la stazione?', 'Vorrei dell’acqua, per favore.', 'Come ti chiami?', 'Quanto costa?', 'Non capisco.', 'Puoi ripetere, per favore?', 'Dov’è il bagno?', 'A domani!'],
  'pt-BR': ['Onde fica a estação?', 'Eu gostaria de água, por favor.', 'Como você se chama?', 'Quanto custa isso?', 'Eu não entendo.', 'Pode repetir, por favor?', 'Onde fica o banheiro?', 'Até amanhã!'],
}

const localizedStudy = {
  es: ['¿Dónde está la estación?', 'Me gustaría agua, por favor.', '¿Cómo te llamas?', '¿Cuánto cuesta esto?', 'No entiendo.', '¿Puedes repetir, por favor?', '¿Dónde está el baño?', '¡Hasta mañana!'],
  fa: ['ایستگاه کجاست؟', 'لطفاً آب می‌خواهم.', 'اسمتان چیست؟', 'این چقدر است؟', 'متوجه نمی‌شوم.', 'لطفاً تکرار می‌کنید؟', 'دستشویی کجاست؟', 'تا فردا!'],
  it: ['Dov’è la stazione?', 'Vorrei dell’acqua, per favore.', 'Come ti chiami?', 'Quanto costa?', 'Non capisco.', 'Puoi ripetere, per favore?', 'Dov’è il bagno?', 'A domani!'],
  'pt-BR': ['Onde fica a estação?', 'Eu gostaria de água, por favor.', 'Como você se chama?', 'Quanto custa isso?', 'Eu não entendo.', 'Pode repetir, por favor?', 'Onde fica o banheiro?', 'Até amanhã!'],
}

export const starterExercises = {}
for (const language of ['en', 'es', 'fa', 'it', 'pt-BR']) {
  starterExercises[language] = {}
  for (const [level, items] of Object.entries(exerciseLevels)) {
    starterExercises[language][level] = items.map(([native, study], index) => ({
      native,
      study: language === 'en' ? study : (localizedStudy[language]?.[index] || study),
      hint: study.split(' ').slice(0, 2).join(' '),
    }))
  }
}
