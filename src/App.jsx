import React, { useEffect, useMemo, useState } from 'react'
import { BookOpen, Check, ChevronRight, CircleHelp, Copy, Flame, Gauge, Globe2, Headphones, Home, Languages, Languages as TranslateIcon, LayoutGrid, LogOut, Menu, Moon, Play, RotateCcw, Settings as SettingsIcon, Sparkles, Sun, Target, Volume2, X } from 'lucide-react'
import { languageByCode, languages, languageContent, starterExercises } from './data/languages'
import { addRecord, getActiveProfile, getProfiles, makeProfile, saveProfiles, setActiveProfile } from './services/storage'
import { speak, translateText, transliteratePersian } from './services/ai'

const labels = { dashboard: 'Visão geral', translator: 'Tradutor', exercises: 'Exercícios', alphabet: 'Alfabeto & números', grammar: 'Gramática', settings: 'Configurações' }

function Button({ children, variant = 'primary', className = '', ...props }) {
  return <button className={`btn btn-${variant} ${className}`} {...props}>{children}</button>
}

function SelectField({ label, value, onChange, children }) {
  return <label className="field"><span>{label}</span><select value={value} onChange={onChange}>{children}</select></label>
}

function Onboarding({ existingProfiles, onDone }) {
  const [form, setForm] = useState({ name: '', nativeLanguage: 'pt-BR', studyLanguage: 'en', level: 'beginner', goal: 'travel' })
  const [showProfiles, setShowProfiles] = useState(existingProfiles.length > 0)
  const update = (key) => (event) => setForm({ ...form, [key]: event.target.value })
  const submit = (event) => {
    event.preventDefault()
    if (!form.name.trim() || form.nativeLanguage === form.studyLanguage) return
    const profile = makeProfile({ ...form, name: form.name.trim() })
    saveProfiles([...existingProfiles, profile])
    setActiveProfile(profile.id)
    onDone(profile)
  }
  if (showProfiles) {
    return (
      <main className="welcome-screen">
        <div className="welcome-card">
          <div className="brand-mark large">L</div>
          <p className="eyebrow">LINGUAFLOW</p>
          <h1>Olá, {existingProfiles[0].name}!</h1>
          <p className="muted">Pronto para continuar seus estudos?</p>
          <Button onClick={() => { setActiveProfile(existingProfiles[0].id); onDone(existingProfiles[0]) }} className="wide">Entrar <ChevronRight size={18} /></Button>
          <button className="text-button" onClick={() => setShowProfiles(false)}>Trocar de perfil / criar novo</button>
        </div>
      </main>
    )
  }
  return (
    <main className="welcome-screen">
      <div className="onboarding-card">
        <div className="brand-row"><div className="brand-mark">L</div><span>LINGUAFLOW</span></div>
        <div className="step-indicator"><span className="active">1</span><i /><span>2</span><i /><span>3</span></div>
        <p className="eyebrow">SEU NOVO RITMO DE APRENDIZADO</p>
        <h1>Aprenda idiomas<br /><em>com fluidez.</em></h1>
        <p className="intro">Uma jornada personalizada para você se comunicar com confiança, todos os dias.</p>
        <form onSubmit={submit}>
          <label className="field"><span>Como podemos te chamar?</span><input required value={form.name} onChange={update('name')} placeholder="Seu nome" /></label>
          <div className="form-grid">
            <SelectField label="Meu idioma nativo" value={form.nativeLanguage} onChange={update('nativeLanguage')}>
              {languages.map((language) => <option key={language.code} value={language.code}>{language.flag} {language.name}</option>)}
            </SelectField>
            <SelectField label="Quero aprender" value={form.studyLanguage} onChange={update('studyLanguage')}>
              {languages.map((language) => <option key={language.code} value={language.code}>{language.flag} {language.name}</option>)}
            </SelectField>
          </div>
          <div className="form-grid">
            <SelectField label="Meu nível atual" value={form.level} onChange={update('level')}>
              <option value="beginner">Iniciante</option>
              <option value="intermediate">Intermediário</option>
              <option value="advanced">Avançado</option>
            </SelectField>
            <SelectField label="Meu objetivo" value={form.goal} onChange={update('goal')}>
              <option value="travel">Viagem</option>
              <option value="work">Trabalho</option>
              <option value="study">Estudos</option>
              <option value="curiosity">Curiosidade</option>
            </SelectField>
          </div>
          <Button type="submit" className="wide">Começar a aprender <ChevronRight size={18} /></Button>
        </form>
        <p className="privacy-note">Seus dados ficam somente neste navegador. <CircleHelp size={14} /></p>
      </div>
      <div className="welcome-decoration">
        <div className="orb orb-one" />
        <div className="orb orb-two" />
        <div className="quote-card"><Sparkles size={18} /><span>Pequenos passos.<br /><strong>Grandes conversas.</strong></span></div>
      </div>
    </main>
  )
}

function Sidebar({ page, setPage, profile, onSwitch, dark, setDark, mobileOpen, setMobileOpen }) {
  return (
    <aside className={`sidebar ${mobileOpen ? 'open' : ''}`}>
      <div className="sidebar-top">
        <div className="brand-row"><div className="brand-mark">L</div><span>LINGUAFLOW</span></div>
        <button className="close-mobile" onClick={() => setMobileOpen(false)}><X size={20} /></button>
        <div className="profile-mini">
          <div className="avatar">{profile.name.slice(0, 1).toUpperCase()}</div>
          <div>
            <strong>{profile.name}</strong>
            <span>{languageByCode(profile.studyLanguage).flag} {languageByCode(profile.studyLanguage).name}</span>
          </div>
          <button onClick={onSwitch} title="Trocar perfil"><RotateCcw size={16} /></button>
        </div>
      </div>
      <nav>
        <p className="nav-label">APRENDER</p>
        {[['dashboard', Home], ['translator', TranslateIcon], ['exercises', Target], ['alphabet', Languages], ['grammar', BookOpen]].map(([key, Icon]) => (
          <button key={key} className={page === key ? 'active' : ''} onClick={() => { setPage(key); setMobileOpen(false) }}>
            <Icon size={18} /><span>{labels[key]}</span>
            {key === 'exercises' && <b className="new-pill">NOVO</b>}
          </button>
        ))}
        <p className="nav-label secondary">GERENCIAR</p>
        <button className={page === 'settings' ? 'active' : ''} onClick={() => { setPage('settings'); setMobileOpen(false) }}>
          <SettingsIcon size={18} /><span>Configurações</span>
        </button>
      </nav>
      <div className="sidebar-bottom">
        <div className="offline-badge"><span /> Modo offline ativo</div>
        <button className="theme-toggle" onClick={() => setDark(!dark)}>
          {dark ? <Sun size={16} /> : <Moon size={16} />} {dark ? 'Modo claro' : 'Modo escuro'}
        </button>
      </div>
    </aside>
  )
}

function Header({ page, profile, setMobileOpen, dark, setDark }) {
  return (
    <header className="topbar">
      <button className="mobile-menu" onClick={() => setMobileOpen(true)}><Menu size={21} /></button>
      <div>
        <p className="breadcrumb">Meu aprendizado <ChevronRight size={13} /> <strong>{labels[page]}</strong></p>
        <h2>{labels[page]}</h2>
      </div>
      <div className="header-actions">
        <button className="theme-icon-button" onClick={() => setDark(!dark)} aria-label={dark ? 'Ativar modo claro' : 'Ativar modo escuro'} title={dark ? 'Modo claro' : 'Modo escuro'}>
          {dark ? <Sun size={18} /> : <Moon size={18} />}
        </button>
        <button className="icon-button" title="Ajuda"><CircleHelp size={19} /></button>
        <div className="header-avatar">{profile.name.slice(0, 1).toUpperCase()}</div>
      </div>
    </header>
  )
}

function StatCard({ icon: Icon, label, value, detail, color }) {
  return (
    <div className="stat-card">
      <div className={`stat-icon ${color}`}><Icon size={19} /></div>
      <div><span>{label}</span><strong>{value}</strong><small>{detail}</small></div>
    </div>
  )
}

function Dashboard({ profile, setPage }) {
  const study = languageByCode(profile.studyLanguage)
  const exercise = starterExercises[profile.studyLanguage]?.[profile.level]?.[0] || starterExercises.en.beginner[0]
  const exercisePronunciation = study.code === 'fa' && exercise.study ? transliteratePersian(exercise.study) : ''
  const speakExercise = () => speak(exercise.study, study.speech, profile.preferences.speechRate, profile.preferences.voiceGender)
  return (
    <div className="page-content">
      <div className="dashboard-hero">
        <div>
          <p className="eyebrow">SUA JORNADA, UM PASSO POR VEZ</p>
          <h1>Bem-vindo de volta, <em>{profile.name.split(' ')[0]}.</em></h1>
          <p>Continue de onde parou e mantenha o ritmo da sua jornada.</p>
        </div>
        <div className="hero-illustration">
          <div className="sun-disc" />
          <span className="floating-word">hello</span>
          <span className="floating-word two">hola</span>
          <span className="floating-word three">olá</span>
        </div>
      </div>
      <div className="stats-grid">
        <StatCard icon={Flame} label="Sequência atual" value={`${profile.stats.streakDays} dias`} detail="Continue assim!" color="orange" />
        <StatCard icon={Gauge} label="Dias estudados" value={profile.stats.daysStudied} detail="Total acumulado" color="purple" />
        <StatCard icon={TranslateIcon} label="Traduções" value={profile.stats.translationsCount} detail="Textos traduzidos" color="blue" />
        <StatCard icon={Target} label="Exercícios" value={profile.stats.exercisesCompleted} detail={`${profile.stats.exercisesCorrect} respostas certas`} color="green" />
      </div>
      <div className="section-heading">
        <div><p className="eyebrow">CONTINUE APRENDENDO</p><h3>O que você quer praticar?</h3></div>
        <button className="link-button" onClick={() => setPage('exercises')}>Ver todos <ChevronRight size={15} /></button>
      </div>
      <div className="quick-grid">
        <button onClick={() => setPage('translator')} className="quick-card blue-bg">
          <div><span className="quick-icon"><TranslateIcon size={20} /></span><strong>Traduzir um texto</strong><small>Pratique vocabulário e expressões</small></div>
          <ChevronRight />
        </button>
        <button onClick={() => setPage('exercises')} className="quick-card orange-bg">
          <div><span className="quick-icon"><Target size={20} /></span><strong>Exercício do dia</strong><small>Uma conversa rápida para praticar</small></div>
          <ChevronRight />
        </button>
        <button onClick={() => setPage('alphabet')} className="quick-card purple-bg">
          <div><span className="quick-icon"><Languages size={20} /></span><strong>Explorar {study.name}</strong><small>Alfabeto, números e pronúncia</small></div>
          <ChevronRight />
        </button>
      </div>
      <div className="daily-card">
        <div className="daily-title">
          <span className="icon-wrap"><Sparkles size={17} /></span>
          <div><p className="eyebrow">SUGESTÃO DA IA</p><h3>Uma frase para hoje</h3></div>
          <span className="level-tag">NÍVEL {profile.level === 'beginner' ? 'INICIANTE' : profile.level.toUpperCase()}</span>
        </div>
        <div className="phrase">
          <strong>{exercise.study}</strong>
          <span>{exercise.native}</span>
          {exercisePronunciation && <small className="daily-pronunciation">Pronúncia: {exercisePronunciation}</small>}
          <button className="phrase-audio" onClick={speakExercise} aria-label="Ouvir frase do exercício"><Volume2 size={16} /> Ouvir tradução</button>
        </div>
        <button className="play-circle" aria-label="Ouvir frase do dia" onClick={speakExercise}><Play size={18} fill="currentColor" /></button>
        <button className="outline-button" onClick={() => setPage('exercises')}>Praticar agora <ChevronRight size={15} /></button>
      </div>
    </div>
  )
}

function Translator({ profile, updateProfile }) {
  const [text, setText] = useState('')
  const [result, setResult] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [sourceCode, setSourceCode] = useState(profile.nativeLanguage)
  const [targetCode, setTargetCode] = useState(profile.studyLanguage)

  const source = languageByCode(sourceCode)
  const target = languageByCode(targetCode)

  const translate = async () => {
    setLoading(true)
    setMessage('')
    try {
      const translated = await translateText(text, source.code, target.code)
      setResult(translated)
      const next = { ...profile, stats: { ...profile.stats, translationsCount: profile.stats.translationsCount + 1 } }
      updateProfile(next)
      await addRecord('translations_history', { original: text, translation: translated, sourceLanguage: source.code, targetLanguage: target.code })
      setMessage('Tradução salva no seu histórico.')
    } catch (error) {
      setMessage(error.message)
    } finally {
      setLoading(false)
    }
  }

  const swapLanguages = () => {
    setSourceCode(target.code)
    setTargetCode(source.code)
    setText(result)
    setResult(text)
  }

  // CORRIGIDO: o áudio sempre usa o texto no idioma de destino (persa, se for o caso).
  // A transliteração fica só na tela.
  const speakText = (value, language) => {
    try {
      speak(value, language.speech, profile.preferences.speechRate, profile.preferences.voiceGender)
      setMessage(`Áudio em ${language.name} iniciado${language.code === 'fa' ? ' pela voz do Farsi do Irã' : ''}.`)
    } catch (error) {
      setMessage(error.message)
    }
  }

  // Apenas para EXIBIÇÃO na tela — nunca vai para o TTS
  const pronunciation = target.code === 'fa' && result ? transliteratePersian(result) : ''

  return (
    <div className="page-content">
      <div className="module-intro">
        <div>
          <p className="eyebrow">PRÁTICA DIÁRIA</p>
          <h1>Traduza com confiança.</h1>
          <p>Explore novas palavras e entenda o contexto por trás de cada frase.</p>
        </div>
        <div className="module-icon blue"><TranslateIcon size={26} /></div>
      </div>
      <div className="translator-panel">
        <div className="language-tabs">
          <select aria-label="Idioma de origem" value={source.code} onChange={(event) => { const nextSource = event.target.value; if (nextSource === targetCode) setTargetCode(sourceCode); setSourceCode(nextSource); setResult('') }}>
            {languages.map((language) => <option key={language.code} value={language.code}>{language.flag} {language.name}</option>)}
          </select>
          <button aria-label="Trocar idiomas" onClick={swapLanguages}><RotateCcw size={16} /></button>
          <select aria-label="Idioma de destino" value={target.code} onChange={(event) => { setTargetCode(event.target.value); setResult('') }}>
            {languages.filter((language) => language.code !== source.code).map((language) => <option key={language.code} value={language.code}>{language.flag} {language.name}</option>)}
          </select>
        </div>
        <div className="translation-columns">
          <div className="translation-box">
            <textarea value={text} onChange={(event) => setText(event.target.value)} placeholder={`Digite uma frase em ${source.name}...`} />
            <span className="char-count">{text.length} / 500</span>
            {text && <button className="speaker-button source-speaker" aria-label="Ouvir texto original" onClick={() => speakText(text, source)}><Volume2 size={17} /></button>}
          </div>
          <div className="translation-box result-box">
            <div className="result-text">
              {result || <span className="placeholder">Sua tradução em {target.name} aparecerá aqui.</span>}
              {pronunciation && <div className="pronunciation"><strong>Pronúncia:</strong> {pronunciation}</div>}
            </div>
            {/* CORRIGIDO: passa o texto persa (result), não a transliteração */}
            {result && <button className="speaker-button" aria-label="Ouvir tradução" onClick={() => speakText(result, target)}><Volume2 size={17} /></button>}
          </div>
        </div>
        <div className="translator-footer">
          <span><Sparkles size={14} /> Tradução inteligente · áudio nativo</span>
          <Button onClick={translate} disabled={loading || !text.trim()}>{loading ? 'Traduzindo...' : 'Traduzir'} <ChevronRight size={16} /></Button>
        </div>
        {message && <p className="feedback">{message}</p>}
      </div>
      <div className="tip-card">
        <Sparkles size={19} />
        <div>
          <strong>Troque o idioma a qualquer momento</strong>
          <p>Escolha qualquer combinação entre os cinco idiomas. O áudio seleciona automaticamente a voz disponível para o idioma escolhido.</p>
        </div>
      </div>
    </div>
  )
}

function Exercises({ profile, updateProfile }) {
  const study = languageByCode(profile.studyLanguage)
  const exercises = starterExercises[profile.studyLanguage]?.[profile.level] || starterExercises.en.beginner
  const [index, setIndex] = useState(0)
  const [revealed, setRevealed] = useState(false)
  const current = exercises[index]
  const complete = (correct) => {
    updateProfile({ ...profile, stats: { ...profile.stats, exercisesCompleted: profile.stats.exercisesCompleted + 1, exercisesCorrect: profile.stats.exercisesCorrect + (correct ? 1 : 0) } })
    setRevealed(true)
  }
  return (
    <div className="page-content">
      <div className="module-intro">
        <div>
          <p className="eyebrow">CONVERSAÇÃO · 8 DESAFIOS DIÁRIOS</p>
          <h1>Fale. Pratique. Evolua.</h1>
          <p>Exercícios ajustados ao seu nível: {profile.level === 'beginner' ? 'iniciante' : profile.level === 'intermediate' ? 'intermediário' : 'avançado'}.</p>
        </div>
        <div className="module-icon orange"><Target size={26} /></div>
      </div>
      <div className="exercise-layout">
        <div className="exercise-main">
          <div className="exercise-top">
            <div>
              <span className="level-tag orange-tag">{profile.level === 'beginner' ? 'INICIANTE' : profile.level.toUpperCase()}</span>
              <p className="exercise-count">EXERCÍCIO {index + 1} DE 8</p>
            </div>
            <div className="progress-track"><span style={{ width: `${((index + 1) / 8) * 100}%` }} /></div>
          </div>
          <div className="exercise-prompt">
            <p className="eyebrow">COMO VOCÊ DIZ EM {study.name.toUpperCase()}?</p>
            <h2>{current.native}</h2>
            <p className="hint-text">Traduza mentalmente antes de revelar a resposta.</p>
            {revealed && (
              <div className="answer-reveal">
                <span>{study.flag}</span>
                <strong>{current.study}</strong>
                <button onClick={() => speak(current.study, study.speech, profile.preferences.speechRate, profile.preferences.voiceGender)} aria-label="Ouvir resposta"><Volume2 size={18} /></button>
              </div>
            )}
            <div className="exercise-actions">
              <Button variant="soft" onClick={() => speak(current.native, languageByCode(profile.nativeLanguage).speech, profile.preferences.speechRate, profile.preferences.voiceGender)}><Volume2 size={17} /> Ouvir frase</Button>
              {!revealed ? (
                <Button onClick={() => setRevealed(true)}>Revelar resposta <ChevronRight size={16} /></Button>
              ) : (
                <>
                  <Button variant="danger-soft" onClick={() => { complete(false); setIndex(Math.min(index + 1, 7)); setRevealed(false) }}>Ainda praticar</Button>
                  <Button onClick={() => { complete(true); setIndex(Math.min(index + 1, 7)); setRevealed(false) }}><Check size={16} /> Avançar</Button>
                </>
              )}
            </div>
          </div>
        </div>
        <aside className="exercise-side">
          <div className="side-card">
            <div className="side-card-title"><Flame size={18} /> Sua sequência</div>
            <strong>{profile.stats.streakDays} dias</strong>
            <p>Você está no desafio {index + 1} de 8. Volte amanhã para manter a sequência.</p>
            <div className="week-dots">
              {['S', 'T', 'Q', 'Q', 'S', 'S', 'D'].map((day, i) => (
                <span key={i} className={i < 4 ? 'done' : i === 4 ? 'today' : ''}>{i < 4 ? <Check size={12} /> : day}</span>
              ))}
            </div>
          </div>
          <div className="side-card">
            <div className="side-card-title"><Headphones size={18} /> Dica rápida</div>
            <p>Ouça a resposta no idioma de estudo e repita em voz alta.</p>
          </div>
        </aside>
      </div>
    </div>
  )
}

function Alphabet({ profile }) {
  const study = languageByCode(profile.studyLanguage)
  const content = languageContent[profile.studyLanguage] || languageContent.en
  const [tab, setTab] = useState('alphabet')
  const items = tab === 'alphabet' ? content.alphabet : content.numbers
  return (
    <div className="page-content">
      <div className="module-intro">
        <div>
          <p className="eyebrow">FUNDAMENTOS</p>
          <h1>Conheça cada som.</h1>
          <p>Explore o alfabeto e os números em {study.name}, no seu ritmo.</p>
        </div>
        <div className="module-icon purple"><Languages size={26} /></div>
      </div>
      <div className="content-tabs">
        <button className={tab === 'alphabet' ? 'active' : ''} onClick={() => setTab('alphabet')}>Alfabeto <span>{content.alphabet.length}</span></button>
        <button className={tab === 'numbers' ? 'active' : ''} onClick={() => setTab('numbers')}>Números <span>1–10</span></button>
      </div>
      <div className={`alphabet-grid ${study.code === 'fa' ? 'rtl' : ''}`}>
        {items.map(([letter, pronunciation]) => (
          <button className="letter-card" key={letter} onClick={() => speak(pronunciation, study.speech, profile.preferences.speechRate)}>
            <strong>{letter}</strong>
            <span>{pronunciation}</span>
            <Volume2 size={14} />
          </button>
        ))}
      </div>
      <div className="tip-card purple-tip">
        <Sparkles size={19} />
        <div>
          <strong>Toque em um item para ouvir</strong>
          <p>Use a repetição em voz alta para treinar sua pronúncia e ganhar confiança.</p>
        </div>
      </div>
    </div>
  )
}

function Grammar({ profile }) {
  const content = languageContent[profile.studyLanguage] || languageContent.en
  const study = languageByCode(profile.studyLanguage)
  const [selected, setSelected] = useState(0)
  return (
    <div className="page-content">
      <div className="module-intro">
        <div>
          <p className="eyebrow">CONSTRUINDO FRASES</p>
          <h1>Gramática sem complicar.</h1>
          <p>Regras claras e exemplos para você entender o idioma de verdade.</p>
        </div>
        <div className="module-icon green"><BookOpen size={26} /></div>
      </div>
      <div className="grammar-layout">
        <div className="grammar-list">
          {content.grammar.map((item, index) => (
            <button key={item.title} className={selected === index ? 'active' : ''} onClick={() => setSelected(index)}>
              <span className="grammar-number">0{index + 1}</span>
              <span><strong>{item.title}</strong><small>{item.tag} · {item.level}</small></span>
              <ChevronRight size={16} />
            </button>
          ))}
        </div>
        <article className="grammar-detail">
          <div className="grammar-detail-header">
            <span className="level-tag green-tag">{content.grammar[selected].level}</span>
            <button className="speaker-button" onClick={() => speak(content.grammar[selected].example, study.speech, profile.preferences.speechRate, profile.preferences.voiceGender)}><Volume2 size={17} /></button>
          </div>
          <h2>{content.grammar[selected].title}</h2>
          <p>{content.grammar[selected].description}</p>
          <div className="example-box">
            <span>EXEMPLO NATURAL</span>
            <strong>{content.grammar[selected].example}</strong>
            {content.grammar[selected].pronunciation && <div className="pronunciation"><strong>Como se fala:</strong> {content.grammar[selected].pronunciation}</div>}
          </div>
          <button className="outline-button" onClick={() => speak(content.grammar[selected].pronunciation || content.grammar[selected].example, study.speech, profile.preferences.speechRate, profile.preferences.voiceGender)}><Headphones size={16} /> Ouvir exemplo</button>
        </article>
      </div>
    </div>
  )
}

function Settings({ profile, updateProfile, onSwitch }) {
  const [form, setForm] = useState(profile)
  const [saved, setSaved] = useState(false)
  useEffect(() => { setForm(profile) }, [profile])
  const update = (key) => (event) => setForm({ ...form, [key]: event.target.value })
  const save = () => { updateProfile(form); setSaved(true); setTimeout(() => setSaved(false), 2000) }
  const exportProfile = () => {
    const blob = new Blob([JSON.stringify(profile, null, 2)], { type: 'application/json' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = `linguaflow-${profile.name.toLowerCase().replace(/\s+/g, '-')}.json`
    link.click()
    URL.revokeObjectURL(link.href)
  }
  return (
    <div className="page-content">
      <div className="module-intro">
        <div>
          <p className="eyebrow">SEU ESPAÇO</p>
          <h1>Configurações.</h1>
          <p>Personalize sua experiência e acompanhe seu progresso.</p>
        </div>
        <div className="module-icon slate"><SettingsIcon size={26} /></div>
      </div>
      <div className="settings-layout">
        <section className="settings-card">
          <div className="settings-card-header">
            <div className="avatar large-avatar">{profile.name.slice(0, 1).toUpperCase()}</div>
            <div><h3>Informações pessoais</h3><p>Estas informações ajudam a personalizar sua jornada.</p></div>
          </div>
          <label className="field"><span>Nome</span><input value={form.name} onChange={update('name')} /></label>
          <div className="form-grid">
            <SelectField label="Idioma nativo" value={form.nativeLanguage} onChange={update('nativeLanguage')}>
              {languages.map((language) => <option value={language.code} key={language.code}>{language.flag} {language.name}</option>)}
            </SelectField>
            <SelectField label="Idioma de estudo" value={form.studyLanguage} onChange={update('studyLanguage')}>
              {languages.map((language) => <option value={language.code} key={language.code}>{language.flag} {language.name}</option>)}
            </SelectField>
          </div>
          <div className="form-grid">
            <SelectField label="Nível" value={form.level} onChange={update('level')}>
              <option value="beginner">Iniciante</option>
              <option value="intermediate">Intermediário</option>
              <option value="advanced">Avançado</option>
            </SelectField>
            <SelectField label="Objetivo" value={form.goal} onChange={update('goal')}>
              <option value="travel">Viagem</option>
              <option value="work">Trabalho</option>
              <option value="study">Estudos</option>
              <option value="curiosity">Curiosidade</option>
            </SelectField>
          </div>
          <div className="form-grid">
            <SelectField label="Voz do áudio" value={form.preferences.voiceGender} onChange={(event) => setForm({ ...form, preferences: { ...form.preferences, voiceGender: event.target.value } })}>
              <option value="female">Feminina</option>
              <option value="male">Masculina</option>
            </SelectField>
            <label className="field">
              <span>Velocidade do áudio: {Number(form.preferences.speechRate).toFixed(1)}x</span>
              <input type="range" min="0.5" max="2" step="0.1" value={form.preferences.speechRate} onChange={(event) => setForm({ ...form, preferences: { ...form.preferences, speechRate: Number(event.target.value) } })} />
            </label>
          </div>
          <div className="settings-actions">
            <Button onClick={save}>{saved ? <><Check size={16} /> Salvo!</> : 'Salvar alterações'}</Button>
          </div>
        </section>
        <section className="settings-card stats-settings">
          <h3>Seu progresso</h3>
          <p>Uma visão do caminho que você já percorreu.</p>
          {[['Dias estudados', profile.stats.daysStudied, 'purple'], ['Traduções feitas', profile.stats.translationsCount, 'blue'], ['Exercícios concluídos', profile.stats.exercisesCompleted, 'orange']].map(([label, value, color]) => (
            <div className="setting-stat" key={label}><span className={`dot ${color}`} /><span>{label}</span><strong>{value}</strong></div>
          ))}
          <hr />
          <button className="settings-link" onClick={exportProfile}><LogOut size={16} /> Exportar meu perfil (JSON)</button>
          <button className="settings-link" onClick={onSwitch}><RotateCcw size={16} /> Trocar de perfil</button>
        </section>
      </div>
    </div>
  )
}

export default function App() {
  const [profile, setProfile] = useState(getActiveProfile())
  const [profiles, setProfiles] = useState(getProfiles())
  const [page, setPage] = useState('dashboard')
  const [dark, setDark] = useState(localStorage.getItem('lls_theme') === 'dark')
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    document.body.classList.toggle('dark', dark)
    localStorage.setItem('lls_theme', dark ? 'dark' : 'light')
  }, [dark])

  const updateProfile = (next) => {
    setProfile(next)
    setProfiles((prevProfiles) => {
      const nextProfiles = prevProfiles.map((item) => item.id === next.id ? next : item)
      saveProfiles(nextProfiles)
      return nextProfiles
    })
  }

  const switchProfile = () => {
    localStorage.removeItem('lls_activeProfileId')
    setProfile(null)
  }

  const content = useMemo(() => ({
    dashboard: <Dashboard profile={profile} setPage={setPage} />,
    translator: <Translator profile={profile} updateProfile={updateProfile} />,
    exercises: <Exercises profile={profile} updateProfile={updateProfile} />,
    alphabet: <Alphabet profile={profile} />,
    grammar: <Grammar profile={profile} />,
    settings: <Settings profile={profile} updateProfile={updateProfile} onSwitch={switchProfile} />,
  })[page], [page, profile])

  if (!profile) {
    return (
      <Onboarding
        existingProfiles={profiles}
        onDone={(next) => {
          setProfile(next)
          setProfiles(getProfiles())
        }}
      />
    )
  }

  return (
    <div className="app-shell">
      <Sidebar
        page={page}
        setPage={setPage}
        profile={profile}
        onSwitch={switchProfile}
        dark={dark}
        setDark={setDark}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />
      <main className="main-area">
        <Header page={page} profile={profile} setMobileOpen={setMobileOpen} dark={dark} setDark={setDark} />
        {content}
      </main>
    </div>
  )
}