import { openDB } from 'idb'

const PROFILE_KEY = 'lls_profiles'
const ACTIVE_KEY = 'lls_activeProfileId'

export const getProfiles = () => JSON.parse(localStorage.getItem(PROFILE_KEY) || '[]')
export const getActiveProfile = () => {
  const id = localStorage.getItem(ACTIVE_KEY)
  return getProfiles().find((profile) => profile.id === id) || null
}
export const saveProfiles = (profiles) => localStorage.setItem(PROFILE_KEY, JSON.stringify(profiles))
export const setActiveProfile = (id) => localStorage.setItem(ACTIVE_KEY, id)
export const makeProfile = (data) => ({
  ...data,
  id: crypto.randomUUID(),
  createdAt: new Date().toISOString(),
  lastActiveAt: new Date().toISOString(),
  stats: { daysStudied: 1, translationsCount: 0, exercisesCompleted: 0, exercisesCorrect: 0, audioPlaybacks: 0, streakDays: 1, lastStudyDate: new Date().toISOString().slice(0, 10) },
  preferences: { voiceGender: 'female', speechRate: 1, theme: 'light', autoPlayAudio: false },
})

let dbPromise
const getDB = () => {
  if (!dbPromise) dbPromise = openDB('linguaflow-db', 1, { upgrade(db) {
    ;['translations_history', 'exercises_progress', 'grammar_progress', 'audio_cache', 'translation_cache'].forEach((store) => { if (!db.objectStoreNames.contains(store)) db.createObjectStore(store, { keyPath: 'id', autoIncrement: true }) })
  } })
  return dbPromise
}
export const addRecord = async (store, record) => (await getDB()).add(store, { ...record, profileId: record.profileId || localStorage.getItem(ACTIVE_KEY), createdAt: new Date().toISOString() })
export const getRecords = async (store, profileId) => (await getDB()).getAll(store).then((items) => items.filter((item) => item.profileId === profileId))
export { PROFILE_KEY, ACTIVE_KEY }
