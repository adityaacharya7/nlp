import { useState, useEffect, useRef } from "react";

const MODULE_COLORS = {
    M1: "#00bcd4",
    M2: "#e91e63",
    M3: "#ff9800",
    M4: "#ab47bc",
    M5: "#42a5f5",
    M6: "#66bb6a"
};

const topics = [
    // ==================== MODULE 1 ====================
    {
        rank: 1, module: "M1", freq: 8, title: "Stages of NLP (5 Stages)",
        subtitle: "Lexical → Syntactic → Semantic → Discourse → Pragmatic",
        color: "#00bcd4", badge: "🔁 PIPELINE",
        content: [
            {
                heading: "Five Major Stages Overview",
                body: `Stage 1: Lexical/Morphological Analysis
→ Breaking text into tokens, assigning POS tags
→ Processes: Tokenization, stemming, lemmatization, POS tagging

Stage 2: Syntactic Analysis (Parsing)
→ Examining grammatical structure, creating parse trees
→ Types: Constituency Parsing, Dependency Parsing

Stage 3: Semantic Analysis
→ Extracting meaning, resolving ambiguities
→ Processes: WSD, semantic role assignment, synonym handling

Stage 4: Discourse Analysis
→ Analyzing meaning flow across multiple sentences
→ Processes: Anaphora resolution, entity tracking, coherence

Stage 5: Pragmatic Analysis
→ Interpreting intended meaning considering social/cultural context
→ Handles: Metaphors, idioms, sarcasm, implied meanings`
            },
            {
                heading: "Complete Example — 'I wanted to print Ali's .init file'",
                body: `Stage 1 (Lexical): Tokens: I, wanted, to, print, Ali's, .init, file
  POS: Pronoun, Verb, Prep, Verb, Proper Noun, Noun, Noun

Stage 2 (Syntactic): S → NP VP; Subject: "I", Verb: "wanted", Object: "to print Ali's .init file"

Stage 3 (Semantic): I → want → print → file (Ali's, .init type)

Stage 4 (Discourse): "I" = speaker, "Ali" = specific person, ".init file" = config file

Stage 5 (Pragmatic): Execute → lpr /ali/stuff.init (understood as system command)`
            },
            {
                heading: "NLP Parse Tree Example — 'The quick brown fox jumps over the lazy dog'",
                body: `S
├── NP (The quick brown fox)
│   ├── DT (The)  ├── JJ (quick)  ├── JJ (brown)  └── NN (fox)
└── VP (jumps over the lazy dog)
    ├── VBZ (jumps)
    └── PP (over the lazy dog)
        ├── IN (over)
        └── NP (the lazy dog)
            ├── DT (the)  ├── JJ (lazy)  └── NN (dog)

Semantic Roles:
• Agent: fox  • Action: jumps  • Object/Target: dog`
            }
        ]
    },
    {
        rank: 2, module: "M1", freq: 7, title: "Ambiguity in Natural Language",
        subtitle: "6 Levels + 10 Factors + Resolution techniques",
        color: "#e91e63", badge: "🔴 DEFINITE",
        content: [
            {
                heading: "Six Levels of Ambiguity (Mnemonic: Pretty Lazy Students Skip Proper Revision)",
                body: `1. Phonetic: Sound-level ambiguity
   "Bare" vs "Bear"; "Ship" vs "Sheep"

2. Lexical: Word-level — single word has multiple meanings
   "Bat" (mammal or sports equipment); "Bank"

3. Syntactic: Sentence-level — multiple valid parse structures
   "Flying planes can be dangerous"; "I saw the man with the telescope"

4. Semantic: Meaning-level ambiguity
   "He is looking for a book" (physical object or knowledge)

5. Pragmatic: Contextual — depends on speaker's intent
   "Can you pass the salt?" (literal ability vs. request)

6. Referential: Unclear what pronoun/noun refers to
   "John told Paul he would be late" (who is "he"?)
   "The dog chased the cat, and it ran away"`
            },
            {
                heading: "10 Factors Causing Ambiguity (Mnemonic: Hungry Pirates Cook Spicy Pasta, Eating Crispy Fried Idli Lunch)",
                body: `1. Homonyms: Same form, different meanings → "Bat"
2. Polysemy: Single word, multiple related meanings → "Bank"
3. Contextual Ambiguity: Meaning changes with context → "Bark"
4. Sentence Structure (Syntactic): Word arrangement → "I saw the man with telescope"
5. Pronouns/Reference: Unclear pronoun → "John told Paul he would be late"
6. Ellipsis: Word omission → "I ordered pizza and she pasta"
7. Cultural/Regional: "Chips" = crisps (US) vs fries (UK)
8. Figurative Language: "It's raining cats and dogs"
9. Intonation/Stress: "I didn't say SHE stole my money"
10. Lack of Specificity: "Let's meet soon" (when is soon?)`
            },
            {
                heading: "Classic Example + Resolution Techniques",
                body: `"The boy saw the man on the mountain with a telescope"
Four interpretations:
1. Boy used telescope to see man on mountain
2. Boy saw man who had telescope on mountain
3. Boy on mountain used telescope to see man
4. Boy saw man on mountain that had telescope

Resolution Techniques:
Level     | Technique
----------+------------------------------------------
Phonetic  | Contextual cues, speech recognition
Lexical   | POS tagging, WSD (Lesk Algorithm)
Syntactic | Probabilistic parsing, Treebank parsing
Semantic  | Semantic Role Labeling (SRL)
Pragmatic | Dialogue modeling, Intent recognition
Referential | Coreference resolution (Hobbs Algorithm)`
            }
        ]
    },
    {
        rank: 3, module: "M1", freq: 6, title: "NLU vs NLG — Components of NLP",
        subtitle: "Natural Language Understanding vs Generation",
        color: "#9c27b0", badge: "⚙️ COMPONENTS",
        content: [
            {
                heading: "Three Main Components",
                body: `1. Speech Recognition:  Speech → Text
   Process: Capture audio → identify patterns → convert to text
   Challenges: Accents, background noise, homophones ("right" vs "write")

2. NLU (Natural Language Understanding):  Text → Meaning/Intent
   Purpose: Understand meaning of human language
   Key components: Tokenization, POS tagging, NER, Intent Classification,
   Dependency Parsing, Contextual Analysis

3. NLG (Natural Language Generation):  Data → Text
   Purpose: Convert structured data into coherent, readable text
   Flow: DATA → PLAN TEXT → FIX → OUTPUT → IMPROVE`
            },
            {
                heading: "NLU Steps — Smart Home Example",
                body: `Input: "Turn on the lights in the living room at 7PM tonight, adjust thermostat to 22°C."

Step 1: Text Preprocessing → Remove stop words, punctuation
Step 2: Entity & Keyword Extraction → lights, living room, 7PM, thermostat, 22°C
Step 3: Sentence Structure Analysis → Subject-Verb-Object
Step 4: Intent Mapping → "Turn on lights" = lighting control action
Step 5: Contextual Refinement → Consider "movie night" preferences
Step 6: Actionable Output → Send commands to smart home devices`
            },
            {
                heading: "NLU vs NLG Comparison",
                body: `Aspect    | NLG                          | NLU
----------+------------------------------+--------------------------------
Purpose   | Data → human-like text       | Understand & interpret language
Direction | Data → Language              | Language → Data
Function  | Generate coherent text       | Recognize intent, extract entities
Output    | Reports, summaries           | Intents, entities, context
Uses      | Report gen, content creation | Virtual assistants, chatbots, SA`
            },
            {
                heading: "NLG 11 Steps (Exam-Ready Flow)",
                body: `1. Data Extraction & Analysis → Extract from sources (patient vitals, EHRs)
2. Data Understanding → Identify patterns (e.g., rising blood pressure)
3. Document Structuring → Logical outline (history, diagnosis, treatment)
4. Sentence Planning → "Patient's blood pressure has been steadily increasing..."
5. Lexicalization → "Hypertension" (medical) vs "high blood pressure" (patient)
6. Syntactic Realization → Correct grammar, subject-verb agreement
7. Surface Realization (Text Generation) → Fluent, readable text
8. Contextualization → Adjust tone: clinical vs. simplified
9. Quality Control → Verify accuracy, dosage recommendations
10. Output → Discharge summary with diagnosis, medications
11. Iterative Improvement → Refine based on feedback`
            }
        ]
    },
    {
        rank: 4, module: "M1", freq: 5, title: "7 Levels of Language Knowledge",
        subtitle: "Phonology → Morphology → Syntax → Semantics → Pragmatics → Discourse → World Knowledge",
        color: "#ff5722", badge: "📚 FOUNDATION",
        content: [
            {
                heading: "Seven Levels Summary",
                body: `Level | Name          | Description                        | Key Elements
------+---------------+------------------------------------+---------------------------
1     | Phonology     | Study of sounds                    | Phonemes, Allophones, Phonotactics
2     | Morphology    | Study of word construction         | Free/Bound morphemes, Inflection, Derivation
3     | Syntax        | Study of word arrangement          | Word order, Sentence structure, CFG
4     | Semantics     | Study of meaning                   | Word meaning, Compositionality
5     | Pragmatics    | Context influence on interpretation| Context, Speech acts, Implicature
6     | Discourse     | Connected sentences + coherence    | Coherence, Anaphora, Topic continuity
7     | World Knowledge| General background knowledge      | General facts, Cultural/social norms`
            },
            {
                heading: "Key Examples for Each Level",
                body: `Phonology: /p/ vs /b/ → "pat" vs "bat" (changes meaning)
           "dogs" → plural 's' pronounced [z] after voiced consonant

Morphology: "unhappiness" = un(prefix) + happy(stem) + ness(suffix)

Syntax: English: SVO (She eats an apple)
        Japanese/Hindi: SOV (She an apple eats)

Semantics: "The cat sat on the mat" = combination of individual word meanings

Pragmatics: "Can you pass the salt?" = request, NOT literal question about ability
            "It's cold in here" → implied request to close window

Discourse: "John went to the store. He bought bread." ("He" = John) → anaphora

World Knowledge: "He's driving a red car" = actual car, not metaphorical`
            }
        ]
    },
    {
        rank: 5, module: "M1", freq: 4, title: "History of NLP + Applications",
        subtitle: "Timeline & real-world uses",
        color: "#607d8b", badge: "📅 HISTORY",
        content: [
            {
                heading: "Timeline of NLP Development",
                body: `Era                    | Period           | Key Developments
-----------------------+------------------+------------------------------------------
Early Days (Rule-Based)| 1950s–Mid 1980s  | 1957: Chomsky's "Syntactic Structures"
                       |                  | 1966: ALPAC report discredits MT
                       |                  | Rule-based approaches dominant

Statistical Approach   | Late 1980s–2000  | 1985: Recurrent Neural Networks (RNNs)
                       |                  | 1989: Hidden Markov Models (HMMs)
                       |                  | 1997: LSTM for enhanced RNNs

Deep Learning/Neural   | Early 2000s–2018 | 2001: Word embeddings
                       |                  | 2013: Word2Vec
                       |                  | 2014: Seq2Seq learning
                       |                  | 2017: "Attention is All You Need" (Transformers)

Large Language Models  | 2019–Today       | 2019: BERT, GPT-2
                       |                  | 2020: GPT-3
                       |                  | 2022: ChatGPT, GPT-4
                       |                  | 2023: LLaMA, Claude, PaLM`
            },
            {
                heading: "Key Applications of NLP",
                body: `• Language Translation: Google Translate, DeepL
• Text Analytics & Sentiment Analysis: social media monitoring
• Speech Recognition: Siri, Alexa, Google Assistant
• Spell & Grammar Checking: Grammarly, Microsoft Word
• Text Summarization: condense long articles
• Chatbots for Customer Support: Zendesk, LivePerson
• Information Extraction: extract names, dates, addresses
• Medical Record Analysis: extract symptoms, diagnoses from EHRs
• Legal Document Analysis: extract clauses, identify risks
• Automatic Content Generation: GPT-3/4, Jasper AI

Why NLP is Needed:
• Exponential growth of unstructured data (emails, social media)
• Human language complexity (ambiguity, slang, dialects)
• Automating repetitive tasks
• Bridging the communication gap (voice assistants)
• Driving innovation (healthcare, education, research)`
            }
        ]
    },

    // ==================== MODULE 2 ====================
    {
        rank: 6, module: "M2", freq: 8, title: "Stemming vs Lemmatization",
        subtitle: "Most asked M2 question — examples for 'better', 'rocks', 'saw'",
        color: "#ff4444", badge: "🔥 MOST FREQUENT",
        content: [
            {
                heading: "Definitions",
                body: `STEMMING:
Text normalization technique that reduces words to their base/root STEM
by removing prefixes, suffixes, and affixes using predefined heuristic rules.
• Rule-based, NOT dictionary-based
• Stem may NOT be a valid word
• Faster but less accurate

LEMMATIZATION:
Reduces words to their LEMMA (dictionary/base form) using vocabulary
and morphological analysis (considers POS context).
• Returns valid dictionary words
• Considers part-of-speech (POS)
• Slower but more accurate`
            },
            {
                heading: "Key Difference + Examples Table",
                body: `Input Word     | Stemming Output | Lemmatization Output
---------------+-----------------+---------------------
Studies        | Studi           | Study
Studying       | Studi           | Study
am, are, is    | (varies)        | be
car, cars      | car             | car
saw (verb)     | s               | see
saw (noun)     | s               | saw
better         | better          | good
rocks          | rock            | rock
running        | run             | run
CHARACTERIZATION→CHARACTER      | characterize

Key: Stemming gives "s" for "saw" — meaningless!
     Lemmatization gives "see" (verb) or "saw" (noun) — context-aware!`
            },
            {
                heading: "Trade-off: Recall vs Precision",
                body: `Stemming:
✅ Increases RECALL: Broader search scope
   e.g., searching "run" finds "running", "ran", "runs"
❌ Harms PRECISION: May match unrelated words
   e.g., "organize" → "organ" (wrong!)

Lemmatization:
✅ Higher PRECISION: Returns valid words
✅ Context-aware via POS tagging
❌ Slower: requires dictionary lookup

Use Cases:
Stemming → Information retrieval, text classification, sentiment analysis
Lemmatization → Machine translation, QA systems, chatbots`
            },
            {
                heading: "Porter's Stemming Algorithm — Step Demonstration",
                body: `Porter Stemmer applies rules in 5 phases to strip suffixes:

Example 1 — "TROUBLED":
TROUBLED → (remove -ED rule: VCVC) → TROUBL → TROUBLE (final fix)
→ Output: TROUBL

Example 2 — "CHARACTERIZATION":
CHARACTERIZATION
↓ (remove -ization, replace with -ize)
CHARACTERIZE
↓ (remove -ize)
CHARACTER ← Final Stem

Example 3 — Batch (same group → same stem):
operate, operating, operates, operation, operative, operatives, operational
→ ALL map to: OPER

Porter Stemmer Rules (key phases):
Phase 1: Remove plurals/past tenses (-sses, -ies, -eed, -ed, -ing)
Phase 2: Remove derivational suffixes (-ational→-ate, -tional→-tion)
Phase 3: Remove other derivational suffixes (-ical, -ful, -ness)
Phase 4: Remove -al, -ance, -er, -ic, -ism, -ous, -ive, -ize
Phase 5: Remove -e, double consonant cleanup`
            }
        ]
    },
    {
        rank: 7, module: "M2", freq: 7, title: "Morphemes — Inflectional vs Derivational",
        subtitle: "Asked 7 times — definitions, differences, examples",
        color: "#ff6b35", badge: "🔴 DEFINITE",
        content: [
            {
                heading: "What is a Morpheme?",
                body: `Definition: The smallest unit of meaning in language.

Structure Hierarchy:
Morpheme
├── Stem → Root word (core meaning)
│   └── Example: "Mango" in "Mangoes"
└── Affix → Modifies the stem
    ├── Prefix (before root): un-, re-, pre-
    ├── Suffix (after root): -ed, -ing, -ness
    └── Infix (within root): rare in English → "passersby"

Types:
Free Morphemes → Can stand alone: book, run, happy, cat
Bound Morphemes → Must attach: -ed, -ing, un-, -s, -ness, -ly

Example Analysis — "unhappiness":
un (prefix) + happy (stem) + ness (suffix)
   negative    core meaning   abstract noun`
            },
            {
                heading: "Inflectional Morphology",
                body: `Definition: Modifies existing words to indicate grammatical features
(tense, number, gender, case) WITHOUT changing the word category.

Key Rules:
❌ Does NOT change word category (verb stays verb, noun stays noun)
❌ Not listed separately in dictionaries
✅ Provides grammatical information

Inflectional Suffixes:
Category  | Suffix | Function            | Example
----------+--------+---------------------+--------------
Noun      | -s     | Plural              | dog → dogs
Noun      | -'s    | Possessive          | child → child's
Adjective | -er    | Comparative         | quick → quicker
Adjective | -est   | Superlative         | quick → quickest
Verb      | -s     | 3rd person present  | work → works
Verb      | -ed    | Past simple         | love → loved
Verb      | -en    | Past participle     | eat → eaten
Verb      | -ing   | Present participle  | eat → eating`
            },
            {
                heading: "Derivational Morphology",
                body: `Definition: Creates NEW words (lexemes) with new meanings and often
new syntactic categories.

Key Rules:
✅ Changes syntactic category (part of speech)
✅ Creates new meaning
✅ Listed separately in dictionaries

Category-Changing Examples:
Noun + -ish → Adjective: boy → boyish
Verb + -al → Noun: remove → removal
Adjective + -ly → Adverb: exact → exactly
Noun + -hood → Abstract Noun: child → childhood
Adjective + -ness → Abstract Noun: good → goodness
Verb + -ing → Noun (gerund): write → writing
Verb + -er/-or → Noun (agent): teach → teacher

Common Suffixes:
-ure, -age: fail → failure; marry → marriage
-er, -or: teach → teacher; act → actor
-ness: happy → happiness`
            },
            {
                heading: "Inflectional vs Derivational Comparison",
                body: `Feature           | Inflectional        | Derivational
------------------+---------------------+---------------------
Word Category     | UNCHANGED           | Often CHANGED
New Word Created  | No (same lexeme)    | Yes (new lexeme)
Dictionary Entry  | Not listed separately| Listed separately
Meaning Change    | Grammatical only    | Semantic change
Position          | Always at word end  | Can be prefix OR suffix
Examples          | cats, walked, quicker| teacher, happiness, unbelievable

Content vs Function Morphemes:
Content Morphemes: Carry semantic meaning (nouns, verbs, adjectives, adverbs)
Function Morphemes: Serve grammatical purposes (the, and, is, -ed, -s)`
            }
        ]
    },
    {
        rank: 8, module: "M2", freq: 4, title: "Word Embeddings — Word2Vec, TF-IDF, BoW, FastText, GloVe",
        subtitle: "All embedding methods compared",
        color: "#ff9500", badge: "🔑 KEY TOPIC",
        content: [
            {
                heading: "Why Word Embeddings? (Importance)",
                body: `Problem with One-Hot Encoding:
• High dimensional, sparse vectors
• No semantic meaning — all words equidistant
• "car" and "automobile" = totally different vectors

Word Embeddings solution:
• Represent words as dense vectors in multi-dimensional space
• Similar words have similar vectors (close in space)
• Captures semantic AND syntactic relationships
• Dense, low-dimensional (typically 100-300 dimensions)

Famous Example:  king - man + woman ≈ queen`
            },
            {
                heading: "Bag of Words (BoW) & TF-IDF",
                body: `BAG OF WORDS:
• Converts text to vectors by counting word frequencies
• Ignores grammar, word order, syntax
• Example:
  Doc1: "Cats are wonderful pets."
  Doc2: "Dogs are wonderful pets."
  Vocabulary: [Cats, are, wonderful, pets, Dogs]
  Doc1 Vector: [1, 1, 1, 1, 0]
  Doc2 Vector: [0, 1, 1, 1, 1]
❌ High dimensionality, no semantic understanding

TF-IDF (Term Frequency - Inverse Document Frequency):
TF(t,d) = freq of term t in doc d / total terms in d
IDF(t) = log(N / DF(t))  where N = total docs, DF = docs containing t
TF-IDF(t,d) = TF × IDF

Example: "The cat sat on the mat." (3 docs total)
TF("the") = 2/6 = 0.333; IDF("the") = log(3/3) = 0  → Score = 0
TF("cat") = 1/6 = 0.167; IDF("cat") = log(3/2) = 0.176 → Score = 0.029

✅ Highlights distinctive words; ❌ Still no semantic understanding`
            },
            {
                heading: "Word2Vec — CBOW vs Skip-gram",
                body: `Definition: Prediction-based model where words in similar contexts have similar vectors.

A. CBOW (Continuous Bag of Words):
• Predicts TARGET word from CONTEXT words
• Analogy: Fill in the blank
• Context: ["Cranberry", "is", "and", "sour"] → Target: "red"
[Cranberry] ─┐
[is]  ────────┼→ [Projection] → [red]
[sour] ───────┘

B. Skip-gram:
• Predicts CONTEXT words from TARGET word
• Better for rare words, larger datasets
• Input: "red" → Output: ["Cranberry", "is", "and", "sour"]

Training Steps:
1. Preprocessing: Tokenize, remove stop words, define context window
2. Training: CBOW predicts center word / Skip-gram predicts context
3. Learning: Adjust vectors to minimize prediction error
4. Optimization: Negative sampling or hierarchical softmax
5. Output: Dense vector for each word

✅ Solves analogies (King-Man+Woman=Queen)
❌ Static embeddings — same vector for all senses (polysemy problem)`
            },
            {
                heading: "GloVe, FastText, Doc2Vec",
                body: `GLOVE (Global Vectors):
• Learns vectors using global word co-occurrence statistics
• Word2Vec: local context window | GloVe: global corpus statistics
• king − man ≈ queen − woman (analogy property)
✅ Captures global relationships ❌ Static embeddings, can't handle polysemy

FASTTEXT (Facebook AI):
• Extension of Word2Vec using CHARACTER N-GRAMS (subwords)
• basketball → <ba, bas, ask, ske, ket, etb...> + whole word
• running → sum of subword vectors [run, unn, nni, nin, ing]
✅ Handles OOV (unknown) words ✅ Captures morphology
❌ More computation cost ❌ Still context-independent (static)

DOC2VEC (Paragraph Vector):
• Extension of Word2Vec for entire DOCUMENTS
• DM architecture (like CBOW): doc vector + context → predict target word
• DBOW architecture (like Skip-gram): doc vector → predict random words
✅ Fixed-length representation for variable text
❌ Needs large dataset, computationally expensive

Evolution:
One-Hot → BoW → TF-IDF → Word2Vec(2013) → Doc2Vec/GloVe(2014) → FastText(2016) → BERT/GPT(2018+)`
            }
        ]
    },
    {
        rank: 9, module: "M2", freq: 4, title: "Lexeme, Lexicon & Vocabulary",
        subtitle: "Definitions + differences",
        color: "#795548", badge: "📖 DEFINITIONS",
        content: [
            {
                heading: "Lexeme vs Lexicon vs Vocabulary",
                body: `LEXEME:
• An abstract unit of lexical meaning — the base/dictionary form of a word
• Represents all its inflected forms as ONE unit
• Example: RUN is one lexeme → includes: run, runs, ran, running, runner
• "walk" and "walked" are forms of the SAME lexeme

LEXICON:
• The complete mental vocabulary/dictionary of a language OR a speaker
• Contains all lexemes a person knows
• Includes: pronunciation, meaning, grammatical category, usage
• System + organized set of linguistic knowledge
• In NLP: a structured database of words and their properties

VOCABULARY:
• The set of words used by a specific person, group, or in a corpus
• Can be active (words used in speaking/writing)
•   or passive (words understood but not commonly used)
• Vocabulary ⊂ Lexicon (vocabulary is more limited/contextual)

Lexicon vs Vocabulary:
Feature    | Lexicon                    | Vocabulary
-----------+----------------------------+-----------------------------
Scope      | Complete language resource | Limited to context/person
Contents   | Words + grammar rules      | Just words
Usage      | Linguistic system          | Personal word knowledge
Example    | English lexicon (all words)| "Technical vocabulary"`
            }
        ]
    },
    {
        rank: 10, module: "M2", freq: 4, title: "Text Preprocessing Steps",
        subtitle: "Tokenization, Stopword removal, Text filtration, Script validation",
        color: "#4caf50", badge: "🧹 PREPROCESSING",
        content: [
            {
                heading: "Why Preprocessing? + Key Steps",
                body: `Need for Preprocessing:
• Raw text contains noise (HTML, special chars, slang)
• Models need clean, standardized input
• Reduces vocabulary size → improves efficiency
• Enables consistent comparison across documents

Key Steps:
1. Tokenization
2. Text Filtration
3. Stop Word Removal
4. Normalization / Lowercasing
5. Script Validation
6. Stemming / Lemmatization
7. POS Tagging
8. Named Entity Recognition`
            },
            {
                heading: "Step-by-Step with Examples",
                body: `1. TOKENIZATION: Split text into tokens (words/phrases/symbols)
   "ChatGPT is amazing!" → ["ChatGPT", "is", "amazing", "!"]
   Sentence: "Hello world. How are you?" → ["Hello world.", "How are you?"]

2. TEXT FILTRATION: Remove unnecessary elements
   Remove special chars: "Hello, world! @OpenAI #AI" → "Hello world OpenAI AI"
   Remove HTML tags: "<p>Hello, world!</p>" → "Hello, world!"
   Lowercasing: "ChatGPT is Amazing" → "chatgpt is amazing"

3. STOP WORD REMOVAL: Remove low-information words
   Stop words: the, is, at, which, on, a, an, and, are, be, by, for, from...
   Input: "The quick brown fox jumps over the lazy dog"
   Output: "quick brown fox jumps lazy dog"

4. SCRIPT VALIDATION: Ensure proper encoding
   Language Detection: "Bonjour" (Latin) vs "Привет" (Cyrillic) vs "नमस्ते" (Devanagari)
   Encoding Validation: Ensure proper UTF-8 for special characters

Benefits of Preprocessing:
✅ Improves model performance  ✅ Reduces noise
✅ Enhances training efficiency  ✅ Standardizes data across sources`
            }
        ]
    },
    {
        rank: 11, module: "M2", freq: 2, title: "FSA & FST in Morphological Analysis",
        subtitle: "Design FST for E-insertion rule parsing 'foxes' to 'fox+N+PL'",
        color: "#3f51b5", badge: "🔧 FSA/FST",
        content: [
            {
                heading: "FSA & FST Overview",
                body: `FSA (Finite State Automaton):
• A machine with states and transitions to recognize patterns
• Used to recognize valid word forms
• Accepts or rejects strings based on rules

FST (Finite State Transducer):
• Like FSA but produces OUTPUT along with recognizing input
• Maps input strings to output strings (two-level morphology)
• Input: surface form → Output: lexical form (or vice versa)

Role in Morphological Analysis:
• Parse word forms like "foxes" → "fox+N+PL"
• Apply spelling rules (E-insertion, vowel harmony)
• Encode both recognition AND generation of word forms`
            },
            {
                heading: "E-Insertion Rule: 'foxes' → 'fox+N+PL'",
                body: `Rule: When pluralizing nouns ending in s, x, z, ch, sh → add -es (not just -s)
This requires E-INSERTION before the plural suffix.

FST Design for 'foxes' → 'fox+N+PL':

States: q0 (start) → q1 → q2 → q3 → q4 → q5 (accept)

Transitions (input:output):
q0 --f:f--> q1
q1 --o:o--> q2
q2 --x:x--> q3      ← identifies 'x' ending (needs E-insertion)
q3 --e:ε--> q4      ← E-insertion: consume 'e', output nothing (it's a rule artifact)
q4 --s:+N+PL--> q5  ← map 's' to morphological tag '+N+PL'

Surface: f-o-x-e-s
Lexical:  f-o-x-+N+PL

Key insight: FST handles the E-insertion rule by recognizing
that 'e' before 's' after sibilants (s,x,z,ch,sh) is an orthographic
artifact → suppress it and output the morpheme tag instead.`
            }
        ]
    },
    {
        rank: 12, module: "M2", freq: 1, title: "N-Gram Spelling Correction",
        subtitle: "Types of spelling errors + N-gram approach",
        color: "#9e9e9e", badge: "✏️ SPELLING",
        content: [
            {
                heading: "Types of Spelling Errors",
                body: `1. Non-word Errors: Result in non-existent words
   "recieve" (should be "receive") → detectable by dictionary

2. Real-word Errors: Valid words but wrong in context
   "their" vs "there" vs "they're" → requires context

3. Typographic Errors: Accidental keystrokes
   Insertion: "teh" for "the"
   Deletion: "bok" for "book"
   Substitution: "fone" for "phone"
   Transposition: "recieve" for "receive"`
            },
            {
                heading: "N-Gram for Spelling Correction",
                body: `N-gram Language Model approach:
• Use bigram/trigram probabilities to detect and correct errors
• A word is suspicious if it creates a low-probability N-gram

Step 1: Detect — compute probability of each word sequence
   "I want to by a car" → P(by | to) is low for this context
   Correct candidate: "buy" → P(buy | to) much higher

Step 2: Generate candidates — words within edit distance 1 or 2
   Candidate operations: insertion, deletion, substitution, transposition

Step 3: Score candidates using N-gram probabilities
   Choose the candidate that maximizes P(w₁w₂...wₙ)

Example:
"The cat sat on the met" → "met" is suspicious
Candidates: mat, met, net, bet, set
Bigram P(mat|the) >> P(met|the) → Correct to "mat"`
            }
        ]
    },

    // ==================== MODULE 3 ====================
    {
        rank: 13, module: "M3", freq: 7, title: "HMM for POS Tagging + Viterbi Algorithm",
        subtitle: "HIGHEST value — emission, transition probabilities + Viterbi decoding",
        color: "#e91e63", badge: "🔥 HIGHEST VALUE",
        content: [
            {
                heading: "HMM Overview",
                body: `Hidden Markov Model (HMM):
• Treats POS tags as HIDDEN STATES
• Treats words as OBSERVATIONS
• Goal: Find most probable tag sequence for observed word sequence

Two Central Probabilities:
1. TRANSITION PROBABILITY: P(tagᵢ | tagᵢ₋₁)
   Probability of one tag following another
   Example: P(Verb | Noun) = probability of Verb after Noun

2. EMISSION PROBABILITY: P(word | tag)
   Probability of a word being generated by a particular tag
   Example: P("run" | Verb) = probability of word "run" given tag Verb

Formulas:
Transition: P(tagᵢ | tagᵢ₋₁) = C(tagᵢ₋₁, tagᵢ) / C(tagᵢ₋₁)
Emission:   P(word | tag)    = C(word, tag) / C(tag)`
            },
            {
                heading: "HMM Working — 6 Steps",
                body: `Step 1: TRAINING PHASE (Learning Probabilities)
→ Use a tagged corpus (text where each word has a POS tag)
→ Calculate Transition Probability: P(tagᵢ | tagᵢ₋₁)
→ Calculate Emission Probability: P(word | tag)

Step 2: INPUT SENTENCE
→ Take a new, untagged sentence for POS tagging

Step 3: INITIALIZATION
→ For first word: compute probabilities for all tags
   using initial probability + emission probability

Step 4: RECURSION (Viterbi Dynamic Programming)
→ For each subsequent word, for each possible tag:
   score = previous_tag_score × transition_prob × emission_prob
→ Store best path (avoid brute-force!)

Step 5: TERMINATION
→ At last word: select tag sequence with highest probability

Step 6: BACKTRACKING
→ Trace back through stored paths → get most likely tag sequence`
            },
            {
                heading: "Numerical Example — Transition & Emission",
                body: `Tagged Corpus:
<S>/START  The/DT  cat/NN  sat/VBD  .  </S>
<S>/START  A/DT    dog/NN  ran/VBD  .  </S>

Transition Probabilities P(tag | prev_tag):
P(DT | START) = 2/2 = 1.0
P(NN | DT)    = 2/2 = 1.0
P(VBD | NN)   = 2/2 = 1.0

Emission Probabilities P(word | tag):
P(The | DT)  = 1/2 = 0.5
P(A | DT)    = 1/2 = 0.5
P(cat | NN)  = 1/2 = 0.5
P(dog | NN)  = 1/2 = 0.5
P(sat | VBD) = 1/2 = 0.5
P(ran | VBD) = 1/2 = 0.5

Viterbi Decoding for "The dog sat":
Word 1 "The":  P(DT) = P(DT|START) × P(The|DT) = 1.0 × 0.5 = 0.5
Word 2 "dog":  P(NN) = P(NN|DT) × P(dog|NN) × 0.5 = 1.0 × 0.5 × 0.5 = 0.25
Word 3 "sat":  P(VBD) = P(VBD|NN) × P(sat|VBD) × 0.25 = 1.0 × 0.5 × 0.25 = 0.125

→ Best sequence: The/DT  dog/NN  sat/VBD ✓

HMM Limitation: Relies on simplifying assumptions; may miss long-range context.`
            }
        ]
    },
    {
        rank: 14, module: "M3", freq: 5, title: "POS Tagging — All 4 Approaches",
        subtitle: "Rule-based, Transformation-based, Stochastic, HMM — Asked 3-4 times each",
        color: "#ff4444", badge: "📌 EVERY EXAM",
        content: [
            {
                heading: "What is POS Tagging?",
                body: `POS tagging = assigning each word its grammatical category (noun, verb, adjective...)

Why Important: Parsing depends on knowing grammatical role of each word.

Common POS Tags (Penn Treebank):
NN-noun, VB-verb, JJ-adjective, RB-adverb, PRP-pronoun, IN-preposition
DT-determiner, CC-conjunction, CD-cardinal number, MD-modal
VBD-past tense, VBG-gerund, VBN-past participle, VBZ-3rd person singular

Example: "She is a beautiful woman"
She → PRP  |  is → VBZ  |  a → DT  |  beautiful → JJ  |  woman → NN

Open Classes (accept new words): Nouns, Verbs, Adjectives, Adverbs
Closed Classes (fixed): Prepositions, Determiners, Conjunctions, Pronouns, Auxiliaries`
            },
            {
                heading: "Approach 1: Rule-Based POS Tagging",
                body: `Uses: Lexicon/dictionary + handcrafted linguistic rules

Two Stages:
Stage 1 — Assign possible tags:
• Look up each word in dictionary → assign all possible tags
• Unknown words: use morphological clues (e.g., -ed → past tense)

Stage 2 — Disambiguation via context rules:
• If DT is followed by word that could be noun/verb → prefer NOUN
• Apply context rules to remove incorrect tags

Advantages: Interpretable, precise for well-defined constructions, linguistically justified
Disadvantages: Labor-intensive, difficult to scale, weak for unseen words`
            },
            {
                heading: "Approach 2: Transformation-Based (Brill's Tagger)",
                body: `Why "Hybrid": Combines Statistical idea (starting with most common tags)
              + Rule-based idea (applying correction rules)

Three Steps:
Step 1: INITIAL TAGGING
• Tag every word with its MOST COMMON tag
• "book" → usually NOUN; "run" → usually VERB
• "I book tickets": I→PRP, book→NOUN❌, tickets→NOUN

Step 2: LEARN CORRECTION RULES
• Compare wrong answers with correctly tagged dataset
• Learn rules like: "Change NOUN to VERB if previous word is pronoun"
• Now: book → VERB ✓

Step 3: APPLY RULES REPEATEDLY
• Keep applying correction rules until accuracy improves

Real-Life Analogy: Writing exam with rough answers first,
then fixing mistakes based on patterns from previous errors.

Advantages: More accurate than basic rules; rules are interpretable
Disadvantages: If initial tagging is bad, performance drops; training takes time`
            },
            {
                heading: "Approach 3: Stochastic/Statistical POS Tagging",
                body: `Uses probabilities learned from annotated corpora.

Predicts tags based on:
• How likely a word is to take a certain tag
• How likely one tag follows another

Example:
• Word appears mostly as noun in training → tagger prefers NOUN
• Determiner usually followed by noun → noun tag more probable after DT

Advantages: Handles ambiguity better; adapts to new corpora; reduces manual effort
Disadvantages: Needs large annotated corpus; poor if training data is limited

Note: HMM is the most important stochastic approach (see HMM topic above)`
            },
            {
                heading: "Challenges in POS Tagging (Why Tagging is Hard)",
                body: `1. Lexical Ambiguity: Many words belong to multiple categories
   play, lead, can, record, tire → noun OR verb depending on context

2. Language Complexity: Natural language has many exceptions

3. Limited Annotated Data: Especially for domain-specific/low-resource languages

4. Morphological Complexity: One word can have many forms

5. Idioms & Colloquial Usage: May not follow ordinary grammar patterns

One-liner exam answer:
"The major challenge in POS tagging is ambiguity, where the same word
may belong to different grammatical categories depending on context."

POS Tagging Steps:
1. Identify ambiguous words
2. Use context (surrounding words)
3. Apply rules or heuristics / compute probabilities
4. Output final tag sequence`
            }
        ]
    },
    {
        rank: 15, module: "M3", freq: 5, title: "Top-Down vs Bottom-Up Parsing",
        subtitle: "Approaches, Parse trees — asked 5 times",
        color: "#ff9500", badge: "🌲 PARSING",
        content: [
            {
                heading: "Overview of Parsing",
                body: `Parsing = analyzing the grammatical structure of sentences.
Exam definition: "Syntax analysis is the process of analyzing the grammatical
structure of a sentence according to rules of a formal grammar, producing a parse tree."

Context-Free Grammar (CFG) rules:
S → NP VP        (Sentence = Noun Phrase + Verb Phrase)
NP → Det N       (Noun Phrase = Determiner + Noun)
VP → V NP        (Verb Phrase = Verb + Noun Phrase)
Det → "the" | "a"
N → "cat" | "ball" | "flight"
V → "chased" | "book"

Parse tree: terminal nodes = actual words; non-terminal = NP, VP, S

Syntactic Ambiguity: "The man saw the boy with the telescope"
Interpretation 1: man used telescope to see boy
Interpretation 2: boy had telescope → called prepositional phrase attachment ambiguity`
            },
            {
                heading: "Top-Down Parsing",
                body: `Direction: Root (S) → Leaves (words)

Steps:
1. Start with start symbol S
2. Choose a production rule to expand S
3. Recursively expand non-terminals
4. Match terminals against actual input words
5. Backtrack if path fails

Example — "The cat sleeps":
1. S → NP VP
2. NP → Det N
3. Det → "The" ✓
4. N → "cat" ✓
5. VP → V
6. V → "sleeps" ✓  → Parsed successfully!

Advantages: Easy to understand; guarantees tree starts with S; predictive
Disadvantages: Vulnerable to left-recursion; wastes effort on non-matching structures`
            },
            {
                heading: "Bottom-Up Parsing (Shift-Reduce)",
                body: `Direction: Leaves (input words) → Root (S)

Operations:
• SHIFT: Move next input token onto stack
• REDUCE: Replace top of stack with non-terminal when it matches grammar rule RHS

Example — "Book that flight" (grammar: S→VP, VP→Verb NP, NP→Det NOM, NOM→Noun, Det→that, Verb→Book, Noun→flight):
Stack          | Input Remaining | Action
───────────────+─────────────────+─────────
               | Book that flight | SHIFT
(Book)         | that flight      | REDUCE: Verb → Book
(Verb)         | that flight      | SHIFT
(Verb that)    | flight           | REDUCE: Det → that
(Verb Det)     | flight           | SHIFT
(Verb Det flight)|                | REDUCE: Noun → flight
(Verb Det Noun)|                 | REDUCE: NOM → Noun
(Verb Det NOM) |                 | REDUCE: NP → Det NOM
(Verb NP)      |                 | REDUCE: VP → Verb NP
(VP)           |                 | REDUCE: S → VP   ✓ SUCCESS

Advantages: Directly uses actual input; handles left-recursion better
Disadvantages: More complex; shift-reduce / reduce-reduce conflicts`
            },
            {
                heading: "Comparison Table",
                body: `Aspect            | Top-Down Parser        | Bottom-Up Parser
------------------+------------------------+---------------------------
Direction         | Root → Leaves          | Leaves → Root
Derivation        | Leftmost derivation    | Rightmost in reverse
Start Point       | Start symbol (S)       | Input tokens
Left Recursion    | Problem!               | Handles well
Guarantees        | Tree starts with S     | Tree matches input
Examples          | Recursive Descent, LL  | Shift-Reduce, LR, SLR

Dependency vs Constituency Parsing:
Dependency: word-to-word relations; "which word depends on which"
Constituency: phrase-level grouping; "which words form phrases together"

Parsing Challenges:
• Ambiguity: multiple parse trees for one sentence
• Long-distance dependencies: related words far apart
• Unstructured input: social media, informal text
• Efficiency: long/complex sentences require more computation`
            }
        ]
    },
    {
        rank: 16, module: "M3", freq: 2, title: "Sequence Labeling & CRF",
        subtitle: "What it is + how CRF is used",
        color: "#607d8b", badge: "🔗 SEQ LABELING",
        content: [
            {
                heading: "Sequence Labeling + CRF",
                body: `SEQUENCE LABELING:
Task of assigning a label to each element in a sequence.
Examples: POS tagging, Named Entity Recognition (NER), Chunking

CRF (Conditional Random Field):
• A discriminative probabilistic model for sequence labeling
• Unlike HMM (generative), CRF directly models P(labels | observations)
• Can use arbitrary overlapping features (previous words, suffixes, etc.)

Advantages over HMM:
• Considers ALL input features simultaneously
• Does NOT assume independence between observations
• Generally achieves higher accuracy for NER and POS tasks

CRF for POS Tagging:
Features used: current word, previous word, next word,
               suffixes (-ing, -ed), capitalization, previous tag

Training: Learn feature weights that maximize P(tags | words) on training data
Inference: Viterbi algorithm to find most probable label sequence`
            }
        ]
    },

    // ==================== MODULES 4-6 (EXISTING) ====================
    {
        rank: 17, module: "M5", freq: 11, title: "N-Gram Language Models",
        subtitle: "Bigram/Trigram calculations, Limitations",
        color: "#ff4444", badge: "🔥 MOST FREQUENT",
        content: [
            {
                heading: "What is an N-Gram?",
                body: `N-grams are contiguous sequences of N items (words) from a given text.
• Unigram (N=1): Single words → "cat", "sat", "mat"
• Bigram (N=2): Two consecutive words → "the cat", "cat sat"
• Trigram (N=3): Three consecutive words → "the cat sat"

Example — Sentence: "A class is a blueprint for the object."
• 2-gram: ['A class', 'class is', 'is a', 'a blueprint', 'blueprint for', 'for the', 'the object']
• 3-gram: ['A class is', 'class is a', 'is a blueprint', ...]`
            },
            {
                heading: "Language Model & Probability",
                body: `A Language Model (LM) assigns probability to a sequence of words:
P(W) = P(w₁, w₂, w₃, ..., wₙ)

Chain Rule of Probability:
P(w₁w₂...wₙ) = P(w₁) × P(w₂|w₁) × P(w₃|w₁w₂) × ... × P(wₙ|w₁...wₙ₋₁)

Markov Assumption (Simplification):
P(wₖ | w₁...wₖ₋₁) ≈ P(wₖ | wₖ₋₁)  [Bigram / k=1]
P(wₖ | w₁...wₖ₋₁) ≈ P(wₖ | wₖ₋₂ wₖ₋₁)  [Trigram / k=2]`
            },
            {
                heading: "Maximum Likelihood Estimate (Bigram MLE)",
                body: `Bigram probability formula:
P(wᵢ | wᵢ₋₁) = C(wᵢ₋₁, wᵢ) / C(wᵢ₋₁)

Worked Example (Corpus):
<S> I am Sam </S>
<S> Sam I am </S>
<S> I do not like green eggs and ham </S>

P(I | <S>) = C(<S>, I) / C(<S>) = 2/3 = 0.67
P(Sam | <S>) = 1/3 = 0.33
P(am | I) = 2/3 = 0.67
P(Sam | am) = 1/2 = 0.5
P(do | I) = 1/3 = 0.33`
            },
            {
                heading: "Bigram Calculation — Full Example",
                body: `Corpus:
<S> I am human </S>
<S> I am not a stone </S>
<S> I I live in Mumbai </S>

Find P(<S> I I am not </S>) using Bigram:

P = P(I|<S>) × P(I|I) × P(am|I) × P(not|am) × P(</S>|not)
= C(<S>,I)/C(<S>) × C(I,I)/C(I) × C(I,am)/C(I) × C(am,not)/C(am) × C(not,</S>)/C(not)
= 3/3 × 1/4 × 2/4 × 1/2 × 0/1
= 1 × 0.25 × 0.5 × 0.5 × 0 = 0

(Zero because "not </S>" never appears in corpus → Data Sparsity!)`
            },
            {
                heading: "Challenges & Limitations of N-Grams",
                body: `1. Data Sparsity: As N increases, many combinations never appear → zero probability
   Solution: Laplace smoothing, Kneser-Ney smoothing

2. Data Quality: Noisy text reduces accuracy
   Solution: Preprocessing

3. Limited Context Awareness: Fixed window can't capture long-range dependencies
   Solution: Neural networks, LSTM, Transformers

4. Language Evolution: New words not in training data
   Solution: Regular model updates

5. Model Complexity: Larger N = larger model
   Solution: Tune parameters, choose optimal N`
            }
        ]
    },
    {
        rank: 18, module: "M4", freq: 10, title: "Five Aspects of Pragmatics",
        subtitle: "Speech acts, Implicature, etc.",
        color: "#ff6b35", badge: "📌 EVERY EXAM",
        content: [
            {
                heading: "What is Pragmatics?",
                body: `Pragmatics studies how context contributes to meaning.
Not WHAT is said, but HOW it is said and how others interpret it.

Key definitions:
1. Study of speaker meaning
2. Study of contextual meaning
3. Study of how more gets communicated than is said
4. Study of expression of relative distance

Example: "Can I cut you?" means very different things in a queue vs. holding a knife!`
            },
            {
                heading: "1. Deixis",
                body: `Words/expressions whose meaning depends on context (time, place, speaker identity)

Types:
• Person deixis: "I", "you", "he"
• Place deixis: "here", "there"
• Time deixis: "now", "yesterday", "tomorrow"
• Discourse deixis: "this point", "the above example"

Example: A note on a door says "I'll be back in an hour"
→ Without knowing WHEN it was written, the meaning is unclear!`
            },
            {
                heading: "2. Implicature",
                body: `Meaning communicated BEYOND the literal words.

Example 1:
A: "Has John arrived?"
B: "There is a blue car in the driveway."
→ B implies John has arrived (without saying it directly)

Example 2:
A: "Did you invite John and Mary?"
B: "I invited John."
→ Implies Mary was NOT invited

Example 3:
A: "I am out of gas."
B: "There's a gas station around the corner."
→ B implicates the station is OPEN`
            },
            {
                heading: "3. Presupposition",
                body: `Something the speaker ASSUMES to be true before making an utterance.

Examples:
• "Jane no longer writes fiction." → Presupposes Jane once wrote fiction
• "Have you stopped eating burgers?" → Presupposes you had eaten burgers
• "I want to do it again." → Presupposes I have done it before

Key property: Negation does NOT change presuppositions!
"I want to do it again" AND "I don't want to do it again"
→ Both presuppose the subject has done it already.`
            },
            {
                heading: "4. Speech Acts",
                body: `An utterance defined by the speaker's intention and its effect on the listener.

Types: requests, warnings, promises, apologies, greetings, declarations

Example 1: "I would like the mashed potatoes, could you please pass them?"
→ Expresses desire + makes a request

Example 2: Boss says: "You are fired." → Performs the act of ending employment

Example 3: "The tea is really cold!"
→ Complaint during winter; Compliment during summer (context matters!)`
            },
            {
                heading: "5. Conversational Structure",
                body: `How conversations are organized: turn-taking, interruptions, adjacency pairs.

Concepts:
• Adjacency pairs: linked utterances (question-answer, greeting-greeting)
• Turn-taking: rules about who speaks when
• Interruptions: when someone speaks before current speaker finishes

Example:
A: "How are you?" → B: "I'm fine." [Adjacency pair ✓]`
            }
        ]
    },
    {
        rank: 19, module: "M4", freq: 10, title: "Hobbs' Algorithm for Coreference Resolution",
        subtitle: "Most frequent algorithm-specific question",
        color: "#ff9500", badge: "⚙️ ALGORITHM",
        content: [
            {
                heading: "What is Coreference?",
                body: `Coreference: Two+ expressions in text refer to the SAME entity.

Example: "Bill said he would come."
→ "Bill" and "he" are coreferential → notation: "Billᵢ said heᵢ would come"

Coreference Resolution = finding ALL expressions referring to same entity.

Steps:
1. Detect the mentions (easy)
2. Cluster the mentions (hard)`
            },
            {
                heading: "Hobbs' Algorithm — Steps",
                body: `ALGORITHM STEPS:
1. Start with the target pronoun
2. Climb up parse tree to find nearest Sentence (S) node
3. For each NP or S encountered on the way up:
   a. Do breadth-first, LEFT-TO-RIGHT search of children
   b. Search restricted to nodes LEFT of target pronoun
   c. For each NP found, check agreement (gender, number, person)
4. If no antecedent found in current sentence → move to PREVIOUS sentences
5. Search previous sentences in REVERSE CHRONOLOGICAL ORDER
6. Repeat breadth-first left-to-right search on those sentences
7. Return FIRST matching NP found`
            },
            {
                heading: "Algorithm Properties",
                body: `Key features:
• Syntax-based: uses syntactic parse tree structure
• Intra-sentential first: searches current sentence before previous ones
• Breadth-first: searches left-to-right, level by level
• Chronological: searches earlier sentences in reverse order

Limitation: Purely syntactic — doesn't consider world knowledge or semantics

Example:
"John went to Bill's car dealership. He looked at an Acura."
→ "He" likely refers to "John" (subject of previous sentence)`
            }
        ]
    },
    {
        rank: 20, module: "M4", freq: 9, title: "Word Sense Disambiguation (WSD)",
        subtitle: "Lesk Algorithm, approaches",
        color: "#ffc107", badge: "🔑 KEY TOPIC",
        content: [
            {
                heading: "What is WSD?",
                body: `WSD = determining which SENSE (meaning) of a word is being used in context.

Classic Examples:
• "financial/river bank"
• "cricket/mammal bat"

Importance: Machine Translation, QA Systems, Information Retrieval, Chatbots`
            },
            {
                heading: "Approaches to WSD",
                body: `1. Supervised Learning: Train ML model on annotated examples
   → Most accurate but requires labeled data

2. Unsupervised Learning: Cluster words in similar contexts
   → No labeled data needed, but less accurate

3. Knowledge-Based (Dictionary-Based):
   → Uses dictionaries/thesauri (WordNet) to find correct sense
   → Does NOT use corpus evidence

4. Hybrid: Combine supervised + knowledge-based
Key knowledge-based method: LESK ALGORITHM`
            },
            {
                heading: "Lesk Algorithm — Full Worked Example",
                body: `Lesk Algorithm = selects word sense whose DICTIONARY DEFINITION
has the greatest OVERLAP with surrounding context words.

Steps:
1. Context Extraction: Get surrounding words of the ambiguous word
2. Dictionary Lookup: Look up ALL senses of the word
3. Context Overlap: Count words in BOTH context AND each sense's definition
4. Sense Selection: Choose sense with HIGHEST overlap

Example 1: "I went to the bank to deposit my check."
Context: {went, deposit, check, my}
Sense 1 (financial): "institution that holds money, accepts deposits, check, account" → overlap: 2
Sense 2 (river bank): "water, side, river, slope" → overlap: 0
→ Selects: Financial Institution ✓

Example 2: "He used a bat to hit the cricket ball."
Context: {used, hit, ball, cricket}
Sense 1 (mammal): "small furry mammal with wings" → overlap: 0
Sense 2 (sports equipment): "flat wooden implement used to hit balls in cricket" → overlap: 3
→ Selects: Sports equipment ✓

Limitation: Sensitive to dictionary quality; fails with ambiguous contexts`
            }
        ]
    },
    {
        rank: 21, module: "M6", freq: 9, title: "Text Summarization",
        subtitle: "Extractive vs Abstractive — Methods, Algorithms, Applications",
        color: "#28a745", badge: "📝 2024-25 TREND",
        content: [
            {
                heading: "Definition & Need for Summarization",
                body: `Summarization means to reduce the size of the document without changing its meaning.
Text summarization is the process of creating a short, coherent, and fluent summary of a
longer text document, involving outlining of the text's major points.

Automatic text summarization is the task of producing a concise and fluent summary
while preserving key information content and overall meaning.

A good summary should cover the most vital information of the original document, while
being coherent, non-redundant, and grammatically readable.

Need for Summarization:
• News Summarization for Indian Languages
• E-Learning and Educational Content Summarization
• Market Research and Business Intelligence
• Social Media Summarization and Sentiment Analysis
• Legal and Government Document Summarization
• Healthcare and Medical Text Summarization`
            },
            {
                heading: "A. Extractive Summarization",
                body: `Involves selecting and combining sentences from the source text to create a summary.
The extraction is made according to the defined metric without making any changes to the texts.
Sentences are pulled directly from the original text based on importance scores.

Detailed Process: Extraction-Based Summarization
• Pulls keyphrases from the source document and combines them
• Based on frequency method: store important words and their frequencies in a dictionary
• Sentences containing high-frequency words are stored in the final summary
• Words in the summary confirm they are part of the given text

Example:
Source Text: "Joseph and Mary rode on a tesla to attend the annual event in New york.
In the city, Mary got job in Google. Mary was assigned as ML developer."

Extractive Summary: "Joseph and Mary rode on a tesla to attend the annual event in
New york. Mary was assigned as ML developer."

Limitations:
• Lack of creativity
• Redundancy and Repetition
• Coherence and Flow issues
• Handling new or unseen information
• Difficulty with Noisy or Irrelevant Sentences
• Dependency on Sentence-Level Units
• Lack of Abstraction`
            },
            {
                heading: "B. Abstractive Summarization",
                body: `Involves generating a concise and coherent summary by understanding the content and
context and producing new sentences that capture the essence of the original text.
Creates new phrases and sentences that relay the most useful information—like humans do.
Performs better than extraction as it paraphrases and shortens parts of the source document.

Detailed Process: Abstraction-Based Summarization
Algorithms create new phrases and sentences relaying the most useful information.
Entails paraphrasing and shortening parts of the source document.

Example:
Source: "Peter and Elizabeth took a taxi to attend the night party in the city.
While in the party, Elizabeth collapsed and was rushed to the hospital."

Abstractive Summary: "Elizabeth was hospitalized after attending a party with Peter."

Case Study: Abstractive Text Summarization for English Documents
Approach: Create semantic graph called Rich Semantic Graph (RSG) for the original
document, reduce the generated semantic graph, and generate final abstractive summary.

Process:
1. Input: Accepts single document (.txt)
2. Pre-processing: Tokenization, Filtration, Named Entity Recognition
3. POS Tagging: Using Stanford Parser/Open NLP Parser
4. Rich Semantic Graph Generation: Generate graph for entire document
5. Graph Reduction: Using reduction rules
6. Output: Summary

Algorithm:
  Accept the text document as input in English
  for each sentence in the input document
    for each word in the sentences
      do tokenization and filtration
      part-of-speech tagging (POS)
      named entity recognition (NER)
    Generate the graph for each sentence
  for entire document do
    Merge all sentence graph to represent whole document
  Reduce the graph using reduction rules
  Generate summary`
            },
            {
                heading: "Hindi/Marathi BART Architecture & Applications",
                body: `Hindi/Marathi - BART Architecture:
• Uses Base Transformer Model
• BART Dense layer with adjusted hyper-parameters
• Probability Beam Search (beam size = 4)
• Softmax Layer for generating summaries

Applications of Text Summarization:
• Used as a preliminary stage for information retrieval tasks
• Simplifies Text categorization
• Widely used due to information overload problem where information searched is very large
• Need for meaningful summary to save time

Extractive vs Abstractive Comparison:
Feature          | Extractive              | Abstractive
-----------------+-------------------------+---------------------------
Output           | Existing sentences      | Newly generated text
Method           | Select & combine        | Paraphrase & synthesize
Creativity       | None                    | High
Coherence        | Can be poor             | Generally better
Complexity       | Simpler                 | More complex
Models           | Statistical, TF-IDF     | Seq2Seq, Transformers
Accuracy         | High fidelity to source | May introduce errors`
            }
        ]
    },
    {
        rank: 22, module: "M6", freq: 9, title: "Sentiment Analysis",
        subtitle: "Types, Classification Levels, Techniques, Challenges — Complete Coverage",
        color: "#17a2b8", badge: "📊 STANDARD",
        content: [
            {
                heading: "Definition & Key Elements",
                body: `Sentiment Analysis is a natural language processing task that deals with finding
orientation of opinion in a piece of text with respect to a target.
It deals with analyzing emotions, feelings, and the attitude of a speaker or writer from a
given piece of text. Involves capturing user's behavior, likes and dislikes from text.

Goal: Find opinions, identify sentiments expressed, and classify their polarity.

Key Elements:
• Polarity: Positive or negative opinion
• Subject: Thing being talked about
• Opinion Holder: Person/entity expressing the opinion`
            },
            {
                heading: "Types of Sentiment Analysis",
                body: `1. Standard Sentiment Analysis
   Binary or ternary classification (Positive / Neutral / Negative)
   Examples:
   "I love how Zapier takes different apps and ties them together" → Positive
   "I still need to further test Zapier to say if its useful" → Neutral
   "Zapier is sooooo confusing to me" → Negative

2. Fine-grained Sentiment Analysis
   Granular scale: Very positive, Positive, Neutral, Negative, Very negative
   Examples:
   "The older interface was much simpler" → Negative
   "Awful experience. I would never buy this product again!" → Very Negative
   "I don't think there is anything I really dislike" → Neutral

3. Emotion Detection
   Identifies specific emotions (Happiness, Anger, Sadness, Fear)
   Examples:
   "Hubspot makes my day a lot easier :)" → Happiness
   "Your customer service is a nightmare! Totally useless!!" → Anger

4. Aspect-based Sentiment Analysis (ABSA)
   Focuses on understanding aspects or features discussed in opinion
   Structure: Entity → Aspect → Opinion
   Product reviews contain different opinions on different characteristics
   (Price, UX-UI, Integrations, Mobile Version)
   Example: "SurveyMonkey has a very clean and user-friendly UI"
   → Entity: SurveyMonkey, Aspect: UX-UI, Opinion: Positive

5. Intent Detection
   Finds action behind opinion (what user wants to do)
   Example: "Very frustrated right now. Instagram keeps closing when I log in. Can you
   help?" → Request for Assistance

6. Sarcasm and Irony Detection
   Identifies where expressed sentiment is opposite of literal meaning
   Example: "Oh, wonderful. The traffic is moving even slower now."
   Literal: Positive ("wonderful") | Sarcasm: Negative (annoyed by slow traffic)`
            },
            {
                heading: "Classification Levels in Sentiment Analysis",
                body: `1. Document-level: Classify opinion of whole document as positive or negative

2. Sentence-level: Classify sentiment expressed in each sentence;
   identify if subjective or objective

3. Aspect-level: Classify sentiment with respect to specific aspects of entities
   Example: "The battery life of this camera is too short"
   → Aspect: battery life, Sentiment: Negative`
            },
            {
                heading: "Sentiment Classification Techniques",
                body: `Categories:
1. Rule-based: Predefined rules and patterns; uses lexicon (list of positive/negative words)
2. Automatic systems: ML algorithms learning from past data
3. Hybrid systems: Combine rule-based and automatic

Approaches:
A. Lexicon-based Approach:
   • Dictionary-based Approach
   • Corpus-based Approach: Statistical, Semantic

B. Machine Learning Approach:
   • Supervised Learning: Decision Trees, SVM, Neural Networks, Naive Bayes,
     Bayesian Network, Maximum Entropy
   • Unsupervised Learning: Pattern inference from unlabeled data`
            },
            {
                heading: "Rule-based Sentiment Analysis Process",
                body: `Lexicons: Lists of positive and negative words.
   Positive: "fast", "affordable", "user-friendly"
   Negative: "slow", "pricey", "complicated"

Preprocessing:
1. Tokenization: Splitting text into chunks/tokens/words
2. Lemmatization: Reducing inflected forms to single item (links similar meanings)
   rocks → rock, corpora → corpus, better → good
3. Stopword Removal: Remove articles, prepositions, pronouns, conjunctions

Analysis:
   Count positive and negative words
   Negation handling: "not easy" counted as opposite

Final Scoring: Scale of -100 to 100
   100 = Highest positive sentiment
   0 = Neutral sentiment

Disadvantages:
   Doesn't consider sentence as whole
   Misses complex negation and metaphors (e.g., "Love is a battlefield")
   Requires regular updates`
            },
            {
                heading: "Machine Learning based Sentiment Analysis",
                body: `Step 1: Feature Extraction
   Tokenization, lemmatization, stopword removal
   Vectorization: Transform text to numbers using Bag of Words, Bag-of-ngrams, or Word2vec

Step 2: Training & Prediction
   Algorithm fed sentiment-labelled training set
   Model learns associations between features and labels

Step 3: Predictions
   Model predicts labels for unseen data
   Eliminates need for pre-defined lexicon

Algorithms: Naive Bayes, Logistic Regression, Linear Regression, SVM

General Architecture of Sentiment Analysis System:
Pipeline: Data Collection → Pre-Processing → Feature Extraction
→ Sentiment Classification → Polarity Classification (Positive/Negative/Neutral)

Steps:
1. Break text into component parts (sentences, phrases, tokens, parts of speech)
2. Identify sentiment-bearing phrases and components
3. Assign sentiment score to each phrase (-1 to +1)
4. Optional: Combine scores for multi-layered analysis`
            },
            {
                heading: "Current Challenges for Sentiment Analysis",
                body: `1. Subjectivity
   Texts can be objective or subjective
   Example: "The laptop is good" (subjective, positive) vs. "The laptop is small" (objective, neutral)

2. Context
   Context crucial for understanding sentiment
   Opinion words change polarity based on context
   Example: "Versatility" = positive in "what did you like" but ambiguous alone

3. Irony & Sarcasm
   People use positive words to describe negative feelings
   Example: "May I say how considerate it is of you to enable your passengers such an in-
   depth and thorough tour of the Caribbean..." (words like "considerate" and "magnificent"
   positive, but overall sentiment negative)

4. Other Challenges:
   • Emojis: Interpreting emoji sentiment
   • Idioms: "Not my cup of tea"
   • Neutrality: "This laptop is black" (no obvious sentiment)
   • Negation: "I can't not buy another Apple Mac" (positive sentiment with negative words)

Applications of Sentiment Analysis:
• Customer feedback analysis
• Social media monitoring
• Customer experience management
• Market research and survey coding
• Product feeling analysis from reviews
• Airline experience tracking (monitoring tweets about delays, upgrades, in-flight entertainment)`
            }
        ]
    },
    {
        rank: 23, module: "M6", freq: 7, title: "Question Answering Systems",
        subtitle: "3 Stages, Types, IR vs QA Comparison, Tools & Models",
        color: "#6f42c1", badge: "💬 STANDARD",
        content: [
            {
                heading: "Definition",
                body: `Question Answering (QA) system designed to answer user queries by providing
precise, explicit, and concise responses from databases or external knowledge sources.
Unlike IR systems that return documents/web pages, QA systems deliver specific answers
to natural language questions.

Consists of three main parts:
1. Question Processing
2. Answer Retrieval
3. Answer Generation`
            },
            {
                heading: "1. Question Processing",
                body: `Key Tasks:
• Question Classification: Determine question type (who, what, where, when, how, why)
  Example: "Who was the first president...?" → "Who" question (person identification)

• Named Entity Recognition (NER): Identify proper nouns (people, places, organizations, dates)
  Example: "What is the capital of France?" → "France" = location entity

• Syntactic Parsing: Analyze grammatical structure (subject, verb, object)
  Example: "Who invented the telephone?" → Subject ("Who"), Verb ("invented"), Object ("the telephone")

• Semantic Understanding: Interpret meaning beyond words; disambiguate
  Example: "What is the bank of the river?" → "Bank" = side of river (not financial)

• Query Reformulation: Rephrase complex queries
  Original: "How many species?" → Reformulated: "How many species of tigers are there?"`
            },
            {
                heading: "2. Answer Retrieval",
                body: `Approaches:
• Information Retrieval: Match query against document collection; return ranked list
• Document Retrieval: Retrieve documents likely to contain answer; extract relevant portions
• Answer Extraction: Identify specific text fragments/snippets directly answering the question
  Example: "What is the tallest mountain?" → Extracts "Mount Everest is the tallest mountain..."
• Knowledge Base Retrieval: Query structured knowledge bases (DBpedia, Wikidata) directly
  Example: "Who is the president of the US?" → Direct query returns "Joe Biden"`
            },
            {
                heading: "3. Answer Generation",
                body: `Methods:
• Extractive Question Answering: Extract answer directly from retrieved text using NLP
  Example: From "The Eiffel Tower is in Paris, France" → Extracts "Paris"

• Abstractive Question Answering: Generate answer based on understanding;
  creates natural language responses not in source material
  Uses transformers (GPT, BERT)
  Example: "How does photosynthesis work?" → Generates detailed synthesized explanation

• Response Refinement: Refine/rephrase for clarity, coherence, completeness
• Personalized Answers: Tailor answers based on user preferences`
            },
            {
                heading: "Types of QA Systems",
                body: `By Domain:
• Closed-domain QA: Specific subject area (medical, customer support)
• Open-domain QA: Any topic (general-purpose like Google Search)

By Question Type:
1. Factoid Question: "What is the capital of Japan?" → "Tokyo"
2. Descriptive Question: "Describe photosynthesis" → Detailed explanation
3. Yes/No Question: "Is the Earth round?" → "Yes"
4. List Question: "What are the colors of the rainbow?" → List of colors
5. Complex Question (How/Why): "How does gravity work?" → Explanatory answer

By Technology:
1. IR-Based QA: Retrieves text segments from document collections (e.g., Google Search snippets)
2. Knowledge-Based QA: Queries structured databases using SQL/SPARQL (e.g., Wikidata, DBpedia)
3. LLM-Based QA: Uses Large Language Models (GPT, BERT) for contextual understanding (e.g., ChatGPT, IBM Watson)`
            },
            {
                heading: "IR vs QA Comparison & Tools",
                body: `Comparison: Information Retrieval vs. Question Answering:
Aspect      | Information Retrieval (IR)        | Question Answering (QA)
------------+----------------------------------+--------------------------------
Objective   | Retrieve ranked list of relevant  | Provide specific, concise answer
            | documents                         |
Response    | List of documents/snippets        | Direct answer/fact (sentence or phrase)
Search      | Matches keywords/phrases           | Requires deeper semantic understanding
Example     | List of documents about "climate   | "The current global temperature
            | change"                            |  increase is 1.1°C"

QA Tools and Models:
Category                    | Tools/Models
----------------------------+-------------------------------------
Pre-trained QA Models       | BERT, GPT-3, T5, RoBERTa
Open-domain QA              | Google BERT, SQuAD, Haystack
Custom QA Pipelines         | Rasa, Haystack
Machine Reading Comprehension| DrQA, ALBERT, T5
Semantic Search             | Elasticsearch with Semantic Search, Faiss`
            }
        ]
    },
    {
        rank: 24, module: "M6", freq: 5, title: "Machine Translation",
        subtitle: "RBMT, SMT, NMT — Process, Components, Challenges",
        color: "#20c997", badge: "🌐 TRANSLATION",
        content: [
            {
                heading: "Definition & General Process Flow",
                body: `Machine Translation (MT) is the process of using computer software to automatically
translate text or speech from one language (source language) into another (target language).

MT systems use a variety of algorithms and techniques to convert words and sentences
while attempting to preserve their meaning. This process can occur with or without human
assistance, though human input may be required to ensure high-quality translation.

Example:
Source Text: "The boy is playing in the park."
Target Language: Marathi
MT Output: "मुलगा उद्यानात खेळत आहे"

General Process Flow:
1. Preprocessing (Tokenization, POS Tagging, Named Entity Recognition) →
2. Text Analysis (Morphological Analysis, Syntax Parsing) →
3. Translation (Rule-Based / Statistical / Neural Translation) →
4. Model (Dictionary Lookup / Phrase Matching / Deep Learning) →
5. Post-Processing (Grammar Check, Word Reordering, Punctuation Fixing) →
6. Fluency & Fixes (Transliteration - Optional) → Output Sentence (Target Language)`
            },
            {
                heading: "A. Rule-Based Machine Translation (RBMT)",
                body: `Classical approach relying on predefined linguistic rules and bilingual dictionaries.
Uses explicit linguistic rules rather than data-driven approaches.
Based on grammatical, syntactic, and morphological characteristics.

Components of RBMT System:
1. Analysis Phase (Source Language Processing):
   • Tokenization: Breaking text into words
   • Morphological Analysis: Identifying root words and suffixes
   • Part-of-Speech (POS) Tagging: Identifying nouns, verbs, adjectives, etc.
   • Syntactic Analysis: Understanding sentence structure

2. Transfer Phase (Language Mapping Rules):
   • Lexical Transfer: Word-for-word dictionary translation
   • Syntactic Transfer: Reordering words according to target language rules
   • Semantic Transfer: Resolving ambiguities and meaning

3. Generation Phase (Target Language Processing):
   • Morphological Generation: Adding suffixes and inflections
   • Syntax Correction: Ensuring correct word order
   • Post-Processing: Refining output for fluency and accuracy

Step-by-Step RBMT Process:
Step 1: Preprocessing → Break down source sentence, identify parts of speech, word order
Step 2: Lexical Analysis → Map each word to target language using bilingual dictionary
Step 3: Syntax Mapping → Apply language-specific rules for grammatical structure conversion
Step 4: Postprocessing → Refine translated sentence for syntax and idiomatic rules`
            },
            {
                heading: "RBMT Detailed Example: English to Marathi",
                body: `Input: "The boy is playing in the park"

Tokenization: ["The", "boy", "is", "playing", "in", "the", "park"]

Morphological Analysis:
  boy → मुलगा (mulga) [Singular noun]
  playing → खेळत आहे (khelat aahe) [Present Continuous Tense]
  park → उद्यान (udyaan) [Noun]

Syntactic Analysis:
  English (SVO): Subject + Verb + Object
  Marathi (SOV): Subject + Object + Verb

Final Output: "मुलगा उद्यानात खेळत आहे" (Mulga udyaanat khelat aahe)

Another Example:
English: "The book is on the table" → English (S+V+PP) vs. Japanese (S+PP+V)
Japanese: "本はテーブルの上にあります" (Hon wa tēburu no ue ni arimasu)`
            },
            {
                heading: "B. Statistical Machine Translation (SMT)",
                body: `Does not rely on pre-programmed rules; learns translation patterns from large parallel
text corpora. Uses statistical models to determine most likely translation based on
language probabilities.

Process:
1. Corpus Collection: Gather large parallel corpus (sentences in both languages)
2. Training: Analyze word pairs and phrases to determine probabilities of alignments
3. Translation: Use learned statistical model to generate translation
4. Postprocessing: Refine output for fluency`
            },
            {
                heading: "C. Neural Machine Translation (NMT)",
                body: `Modern approach using deep learning and neural networks.
Uses sequence-to-sequence architecture to process source and target language data
through artificial neural networks.

Process:
1. Data Collection: Large parallel corpus needed
2. Model Training: Deep learning model trained to map source to target sentences
3. Translation: System generates translation by predicting most likely sequence of words
4. Postprocessing: Refine for fluency and grammatical accuracy`
            },
            {
                heading: "Challenges of Machine Translation",
                body: `1. Ambiguity: Words/phrases with multiple meanings
   (e.g., "bank" = financial institution or river side)

2. Syntax Differences: Different sentence structures
   (e.g., English SVO vs. Japanese SOV)

3. Cultural Nuances: Idiomatic expressions that don't translate well between cultures

4. Resource Scarcity: Lack of large parallel corpora for low-resource languages

5. Verb Tense and Gender: Languages with gendered nouns/verbs requiring accurate reflection

6. Accuracy: Struggles with specialized fields or complex language

Online Tools for Machine Translation:
Tool              | Description
------------------+----------------------------------------------
Google Translate  | Widely-used, free, supports 100+ languages using NMT and SMT
DeepL Translator  | Known for high-quality translations in European languages
Microsoft Translator | Multi-language support for text, voice, real-time translation
Amazon Translate  | Cloud-based NMT service integrated with AWS
Yandex.Translate  | Russian-based service supporting 90+ languages`
            }
        ]
    },
    {
        rank: 25, module: "M6", freq: 5, title: "Information Retrieval",
        subtitle: "Definition, Components, Variants — Monolingual, CLIR, MLIR",
        color: "#fd7e14", badge: "🔍 COMPARISON",
        content: [
            {
                heading: "Definition & Key Components",
                body: `Information Retrieval (IR) is the process of obtaining relevant information from a large
collection of data based on user queries. The goal is to identify and retrieve items that
match the user's information needs from databases, document collections, or the internet.
Documents satisfying user requirements are called relevant documents.

Example: User searches for "climate change" in academic journal database → System returns
journal articles, research papers, books containing the term or related topics, ranked by relevance.

Key Components of IR Systems:
1. Document Collection: Repository of all searchable documents (web pages, articles, books)
2. Indexing: Organizes and stores terms/words from documents; acts as a map for quick location
3. Query Processing: Analyzes user's query (terms, phrases) to determine likely relevant documents
4. Ranking: Ranks documents by relevance using algorithms measuring alignment with search terms
5. Retrieval: Top-ranked documents presented to user as list or search results
6. User Interface: Search bar/input field facilitating communication
7. Feedback and Refinement: User feedback marks useful/irrelevant documents to refine future algorithms

Types of Information Retrieval:
1. Text Retrieval: Documents based on textual content
2. Multimedia Retrieval: Non-textual content (images, videos, audio)
3. Web Search Retrieval: Web pages from the internet
4. Database Retrieval: Structured information from databases (e.g., SQL queries)`
            },
            {
                heading: "Variants of IR Systems",
                body: `1. Monolingual Information Retrieval:
   • Query language and document language are the same
   • Simplest form: straightforward keyword matching within one language
   • Challenges: Limited to single language; requires exact phrasing knowledge

2. Bilingual / Cross-Lingual Information Retrieval (CLIR):
   • Retrieve documents in a different language from the query
   • Translation approaches: Machine translation (e.g., Google Translate),
     Bilingual dictionary or corpus-based approach using parallel corpora

   Example: Query: English ("global warming effects") → Documents: Spanish
   Process: English query translated to Spanish → Search Spanish collection → Results retrieved

   CLIR Approaches:
   Approach 1: Query Translation
     1. Translate English query into Chinese query
     2. Search Chinese document collection
     3. Translate retrieved results back into English
   Approach 2: Document Translation
     1. Translate entire document collection into English
     2. Search collection in English

   Challenges: Translation accuracy errors, Semantic meaning differences,
   Cultural context variations, Translation of ambiguous terms

3. Multilingual Information Retrieval (MLIR):
   • Document collection contains content in multiple languages
   • Query in one language retrieves documents from various languages
   • Challenges: Language detection and accurate matching,
     Cross-language similarity with varying syntax/semantics,
     Computational complexity with large multilingual corpora`
            },
            {
                heading: "IR Tools and Technologies",
                body: `Category              | Tools
----------------------+---------------------------------------
Search Engines        | Google Search, Elasticsearch, Apache Solr, Amazon CloudSearch
Ranking Algorithms    | BM25, TF-IDF, Lucene
Document Indexing     | Apache Lucene, Whoosh
Distributed IR        | Apache Hadoop, Apache Spark
Faceted Search        | FacetWP, eZPublish`
            }
        ]
    },
    {
        rank: 26, module: "M3", freq: 1, title: "Constituency Parsing",
        subtitle: "Definition & Bottom-up approach",
        color: "#e91e63", badge: "📝 ADDED",
        content: [
            {
                heading: "What is constituency parsing?",
                body: `Constituency parsing is a syntactic analysis method in which a sentence is broken into constituents, i.e., groups of words that function together as a unit, such as NP (Noun Phrase), VP (Verb Phrase), and PP (Prepositional Phrase). These constituents are arranged hierarchically in a parse tree, where the words are terminal nodes and phrase categories are non-terminal nodes.`
            },
            {
                heading: "Bottom-up approach",
                body: `The bottom-up approach starts from the input words and gradually combines them into larger constituents until the whole sentence becomes the start symbol, usually S. In this method, the parser first identifies the lexical category of each word, then repeatedly applies grammar rules to reduce smaller units into larger ones.

Example: For the sentence “The cat sat”
- The → Det
- cat → N
- sat → V
- Det + N → NP
- V → VP
- NP + VP → S

So the sentence is built upward from words to phrases to the full sentence.`
            }
        ]
    },
    {
        rank: 27, module: "M3", freq: 2, title: "Shift-Reduce Parser",
        subtitle: "Explanation & Examples",
        color: "#e91e63", badge: "📝 ADDED",
        content: [
            {
                heading: "Shift-Reduce Parser Overview",
                body: `A shift-reduce parser is a bottom-up parser that uses a stack and an input buffer. It performs mainly two operations:
- Shift: move the next input word onto the stack
- Reduce: if the top of the stack matches the right-hand side of a grammar rule, replace it with the corresponding non-terminal on the left-hand side.`
            },
            {
                heading: "Example (i) “Book that flight”",
                body: `Assume grammar:
- V → book
- Det → that
- N → flight
- NP → Det N
- VP → V NP
- S → VP (imperative sentence)

Shift-reduce steps:
1. Shift Book → Stack: Book
2. Reduce Book → V → Stack: V
3. Shift that → Stack: V that
4. Reduce that → Det → Stack: V Det
5. Shift flight → Stack: V Det flight
6. Reduce flight → N → Stack: V Det N
7. Reduce Det N → NP → Stack: V NP
8. Reduce V NP → VP → Stack: VP
9. Reduce VP → S → Stack: S`
            },
            {
                heading: "Example (ii) “Does that flight include meal”",
                body: `Assume grammar:
- Aux → Does
- Det → that
- N → flight
- V → include
- N → meal
- NP → Det N | N
- VP → V NP
- S → Aux NP VP

Shift-reduce steps:
1. Shift Does → Reduce to Aux
2. Shift that → Reduce to Det
3. Shift flight → Reduce to N
4. Reduce Det N → NP
5. Shift include → Reduce to V
6. Shift meal → Reduce to N
7. Reduce N → NP
8. Reduce V NP → VP
9. Reduce Aux NP VP → S`
            }
        ]
    },
    {
        rank: 28, module: "M3", freq: 1, title: "Top-Down Depth-First Parse Tree",
        subtitle: "Derivation for “The cat sat on the mat”",
        color: "#e91e63", badge: "📝 ADDED",
        content: [
            {
                heading: "CFG Rules",
                body: `Using the representative sentence from the notes: “The cat sat on the mat” with CFG rules:
- S → NP VP
- NP → Det N
- VP → V PP
- PP → P NP
- Det → The, the
- N → cat, mat
- V → sat
- P → on`
            },
            {
                heading: "Top-down, depth-first, left-to-right derivation",
                body: `1. Start with S
2. Expand S → NP VP
3. Expand leftmost NP → Det N
4. Expand Det → The
5. Expand N → cat
6. Go back and expand VP → V PP
7. Expand V → sat
8. Expand PP → P NP
9. Expand P → on
10. Expand NP → Det N
11. Expand Det → the
12. Expand N → mat

So the parse tree is:
S
├── NP → Det(The) + N(cat)
└── VP
  ├── V(sat)
  └── PP
    ├── P(on)
    └── NP → Det(the) + N(mat)`
            }
        ]
    },
    // ==================== MODULE 4 ADDITIONS ====================
    {
        rank: 29, module: "M4", freq: 7, title: "WordNet & Relations",
        subtitle: "Usage & semantic relations with examples",
        color: "#ff9500", badge: "📝 ADDED",
        content: [
            {
                heading: "What is WordNet?",
                body: `WordNet is a lexical database that organizes words according to their meanings and semantic relationships. It helps represent lexical knowledge in a structured form so that computers can process meaning more effectively. It is used in tasks such as semantic analysis, word-sense disambiguation, information retrieval, machine translation, and question answering.`
            },
            {
                heading: "Different relations with examples",
                body: `WordNet captures several important semantic relations:
- Synonymy: words with similar meaning, e.g., big and large
- Antonymy: words with opposite meaning, e.g., hot and cold
- Hypernymy: general category term, e.g., flower for rose
- Hyponymy: specific member of a category, e.g., rose is a type of flower
- Meronymy: part-whole relation, e.g., wheel is part of car
- Holonymy: whole containing a part, e.g., car is the whole of wheel`
            }
        ]
    },
    {
        rank: 30, module: "M4", freq: 1, title: "Sense in WordNet",
        subtitle: "Definition and examples",
        color: "#ff9500", badge: "📝 ADDED",
        content: [
            {
                heading: "What is a 'sense'?",
                body: `In WordNet, a sense is a specific meaning of a word when that word has more than one possible interpretation. A word may belong to different synsets depending on the meaning intended in context.

Example: “bank”
- Sense 1: financial institution — “I deposited money in the bank.”
- Sense 2: river side — “We sat on the bank of the river.”
- Sense 3: storage/reserve — “blood bank” or “data bank”

Thus, “sense” means the exact meaning selected for a word in a given context.`
            }
        ]
    },
    {
        rank: 31, module: "M4", freq: 5, title: "Semantic Relations Explained",
        subtitle: "Homonymy, Polysemy, Synonymy, Antonymy, etc.",
        color: "#ff9500", badge: "📝 ADDED",
        content: [
            {
                heading: "Semantic Relations Definitions",
                body: `Homonymy means the same word form has completely unrelated meanings.
Example: bat = a flying mammal / bat = sports equipment.

Polysemy means one word has multiple related meanings.
Example: bank = financial institution / river bank.

Synonymy means words have similar meanings.
Example: big and large.

Antonymy means words have opposite meanings.
Example: hot and cold; heavy and light.

Hypernymy is the general category relation.
Example: flower is a hypernym of rose.

Hyponymy is the specific instance relation.
Example: rose is a hyponym of flower.

Meronymy is the part-whole relation.
Example: wheel is a meronym of car.`
            }
        ]
    },
    // ==================== MODULE 5 ADDITIONS ====================
    {
        rank: 32, module: "M5", freq: 1, title: "Perplexity of Language Models",
        subtitle: "Definition, Formula, Interpretation & Comparison",
        color: "#ff4444", badge: "📝 ADDED",
        content: [
            {
                heading: "What is Perplexity?",
                body: `Perplexity is a measure of how well a language model predicts a sequence of words.
A lower perplexity means the model is less "surprised" by the test sentence and
therefore predicts better; a higher perplexity means poorer prediction.

Intuitively, perplexity tells us how uncertain the model is while choosing the next word.
It represents the weighted average number of choices the model considers at each step.

Formula:
  PP(W) = P(w₁w₂...wₙ)^(-1/N)
  PP(W) = 2^H(W)  where H(W) is the cross-entropy

Interpretation:
• Lower perplexity = better model (less confused about next word)
• Higher perplexity = worse model (more uncertain)
• A perplexity of k means the model is as uncertain as choosing uniformly from k words

Example:
• Model A: Perplexity = 50 on test set → considers ~50 equally likely next words on average
• Model B: Perplexity = 200 on test set → considers ~200 equally likely next words
→ Model A is better because it's less confused

Used to compare language models: the one with lower perplexity on the same test
data is considered the better model for that domain.`
            }
        ]
    },
    {
        rank: 33, module: "M5", freq: 1, title: "Limitations of HMM & N-gram Models",
        subtitle: "Markov Assumption, Sparsity, Context, Smoothing Solutions",
        color: "#ff4444", badge: "📝 ADDED",
        content: [
            {
                heading: "Markov Assumption & Its Weakness",
                body: `The Markov Assumption states that the probability of a word depends only on the
previous k words (where k = N-1 for an N-gram model).

For Bigram: P(wk | w1...wk-1) ≈ P(wk | wk-1)
For Trigram: P(wk | w1...wk-1) ≈ P(wk | wk-2, wk-1)

This is a key simplification — but it means the model CANNOT capture long-range
dependencies or deep semantic structure in language.`
            },
            {
                heading: "All Limitations of N-gram/HMM Models",
                body: `1. Data Sparsity:
   As n increases, possible combinations grow exponentially
   Many valid sequences never appear in training data → zero probabilities
   Solution: Smoothing techniques (Laplace/Add-1, Good-Turing, Kneser-Ney)

2. Limited Context Awareness:
   Fixed window size cannot capture long-range dependencies
   Fails to understand deep semantic meaning or sentence structure
   Solution: Neural language models, attention mechanisms

3. Data Quality Dependency:
   Sensitive to spelling errors, slang, abbreviations, inconsistent formatting
   Domain mismatch between training and application data
   Solution: Preprocessing (tokenization, normalization, stemming), domain adaptation

4. Language Evolution:
   Static models become outdated as language changes
   New words, phrases, and meanings emerge constantly
   Solution: Regular model updates, temporal modeling

5. Model Complexity Trade-off:
   Higher n = better context but exponential growth in parameters
   Memory and computational costs increase significantly
   Solution: Optimal n selection (typically 2-4 for most applications)

6. No Semantic Understanding:
   Treats words as discrete symbols; cannot understand meaning or similarity

7. Curse of Dimensionality:
   Vocabulary size V means V^n possible n-grams — exponential growth

8. Out-of-Vocabulary (OOV) Words:
   Unseen words in training data cause zero-probability issues`
            }
        ]
    },
    {
        rank: 34, module: "M5", freq: 2, title: "Fine-tuning in Pre-trained Models",
        subtitle: "4 Strategies, PEFT (LoRA, Adapters), Best Practices, NLP Tasks",
        color: "#ff4444", badge: "📝 ADDED",
        content: [
            {
                heading: "What is Fine-tuning?",
                body: `Fine-tuning is the process of taking a model that has already been pre-trained
on a very large corpus and then training it further on a smaller, task-specific dataset.

The Paradigm Shift:
Old approach: Train from scratch for each task (requires massive labeled data)
New approach:
  1. Pre-training: Learn general language representations from unlabeled text
  2. Fine-tuning: Adapt to specific tasks with small labeled datasets

Why it Works:
Pre-trained models capture universal language features (syntax, semantics, world knowledge).
Fine-tuning requires only task-specific adjustments to output layers or internal representations.`
            },
            {
                heading: "Fine-Tuning Strategies",
                body: `1. Full Fine-Tuning:
   Update all model parameters on task-specific data
   Pros: Best performance for target task
   Cons: Computationally expensive; risk of catastrophic forgetting

2. Feature Extraction (Frozen):
   Keep pre-trained weights frozen, add new classification layers on top
   Train only new layers
   Pros: Fast, prevents overfitting on small datasets
   Cons: May underfit complex tasks

3. Layer-wise Fine-Tuning:
   Gradually unfreeze layers from top to bottom
   Lower layers capture general features (syntax); upper layers capture task-specific features

4. Discriminative Fine-Tuning:
   Use different learning rates for different layers
   Lower layers: smaller learning rates (preserve general knowledge)
   Upper layers: larger learning rates (adapt to task)`
            },
            {
                heading: "Parameter-Efficient Fine-Tuning (PEFT)",
                body: `For large models (billions of parameters), full fine-tuning is impractical:

Adapter Layers:
  Insert small trainable layers between frozen pre-trained layers
  Only adapter parameters (2-4% of total) are updated

LoRA (Low-Rank Adaptation):
  Inject trainable low-rank matrices into attention and feed-forward layers
  Reduces trainable parameters by 10,000x while maintaining performance
  Formula: W = W0 + ΔW = W0 + BA (where B and A are low-rank matrices)

Prompt Tuning / Prefix Tuning:
  Add trainable tokens to input prompts rather than changing model weights
  Model learns to "read" these soft prompts to perform tasks`
            },
            {
                heading: "Best Practices & Common NLP Tasks",
                body: `Learning Rate Selection:
  Pre-trained layers: 10⁻⁵ to 10⁻⁴ (small, preserve knowledge)
  New classification layers: 10⁻³ to 10⁻² (larger, learn task)
  Use learning rate warm-up and linear decay schedules

Regularization:
  Dropout: Prevent overfitting in classification layers
  Weight Decay: L2 regularization on fine-tuned parameters
  Early Stopping: Monitor validation loss
  Gradient Clipping: Prevent exploding gradients

Data Considerations:
  Small datasets (<1,000): Use frozen feature extraction or heavy regularization
  Medium (1,000-10,000): Layer-wise fine-tuning with discriminative learning rates
  Large (>10,000): Full fine-tuning possible

Common NLP Tasks & Fine-Tuning:
Task              | Modification              | Example
------------------+---------------------------+--------------------------
Classification    | Add [CLS] token + Softmax | Sentiment, spam detection
Sequence Labeling | Token-level Softmax       | NER, POS tagging
Question Answering| Span prediction heads     | SQuAD dataset
Sentence Similarity| Siamese architecture     | Semantic textual similarity
Text Generation   | Autoregressive decoding   | Summarization, translation`
            }
        ]
    },
    {
        rank: 35, module: "M5", freq: 1, title: "Pre-training Techniques: MLM and NSP",
        subtitle: "Detailed Process, Strengths, Limitations, Comparison",
        color: "#ff4444", badge: "📝 ADDED",
        content: [
            {
                heading: "Masked Language Modeling (MLM)",
                body: `Objective: Predict randomly masked tokens using full bidirectional context.

Process:
• 15% of input tokens are randomly masked
• Model is trained to predict these masked tokens using context from BOTH directions
• Example: "The cat sat on the [MASK]" → model predicts "mat"
• This allows bidirectional context learning (unlike GPT which is left-to-right only)

Granularity: Word-level — produces contextual embeddings
Contextual Modeling: Bidirectional (sees left and right context)
Strength: Deep token-level understanding of language
Efficiency: High computational cost per token
Limitation: Ignores sentence-level relationships; creates mismatch between
pre-training and fine-tuning (no [MASK] tokens at inference)`
            },
            {
                heading: "Next Sentence Prediction (NSP)",
                body: `Objective: Predict whether sentence B logically follows sentence A.

Process:
• Model is given two sentences and must predict if B follows A
• Helps model understand sentence-level relationships
• Useful for tasks like QA, text entailment, summarization

Granularity: Sentence-level — captures logical/coherence relationships
Contextual Modeling: Focused on sentence pairs
Strength: Multi-sentence coherence; useful for summarization and QA
Efficiency: Lower computational complexity than MLM
Limitation: Simplistic objective — may not generalize to all downstream tasks;
later research (RoBERTa) showed dropping NSP doesn't hurt performance`
            },
            {
                heading: "MLM vs NSP Comparison",
                body: `Aspect              | MLM                          | NSP
--------------------+------------------------------+---------------------------
Objective           | Predict masked tokens        | Predict sentence continuity
Granularity         | Word-level (embeddings)      | Sentence-level (relations)
Contextual Modeling | Bidirectional                | Focused on sentence pairs
Efficiency          | High cost per token          | Lower computational cost
Strengths           | Deep token-level understanding| Multi-sentence coherence
Limitations         | Ignores sentence relations   | Limited generalizability

Both MLM and NSP are core pre-training tasks for BERT-style models.
RoBERTa later showed that removing NSP and using only MLM with dynamic masking
produces better results on most benchmarks.`
            }
        ]
    },
    {
        rank: 36, module: "M5", freq: 0, title: "RNNs, LSTMs & GRUs",
        subtitle: "Architecture, Gates, Equations, Training, Comparison",
        color: "#ff4444", badge: "📝 ADDED",
        content: [
            {
                heading: "RNNs for Language Modeling",
                body: `RNNs are a type of neural network designed specifically for sequential data,
making them well-suited for language modeling. They can capture patterns and
dependencies over time, essential for understanding the sequential nature of language.

How RNNs Work:
RNNs process sequences by maintaining a hidden state that carries information
from previous steps. This hidden state is updated with each new input, allowing
the model to 'remember' previous information.

Key Equations:
  Hidden state: h(t) = f(Wh · h(t-1) + We · ct)
  Output distribution: ŷ = softmax(W2 · h(t))
  ct = word embeddings (c1, c2, c3, c4...)
  h(0) is the initial hidden state

For next word prediction: the RNN processes each word, uses the hidden state to
carry forward context, and computes probability distribution over the vocabulary
via softmax.

Training — Backpropagation Through Time (BPTT):
• RNNs are trained using BPTT, which unrolls the network through time
• Gradients are propagated backward through each time step
• Loss function: typically cross-entropy loss on predicted vs actual next word

Limitations of Standard RNNs:
1. Vanishing Gradient Problem: Gradients shrink exponentially as they propagate
   back through many time steps — model fails to learn long-range dependencies
2. Exploding Gradient Problem: Gradients can grow uncontrollably (solved with gradient clipping)
3. Sequential Processing: Cannot be parallelized during training — slow for long sequences
4. Short-Term Memory: Struggles to retain information over long distances in text`
            },
            {
                heading: "LSTM (Long Short-Term Memory)",
                body: `LSTM is a specialized RNN architecture designed to solve the vanishing gradient
problem. It introduces a cell state and gating mechanisms to selectively remember
or forget information over long sequences.

LSTM Architecture — Three Gates:

a) Forget Gate:
   Decides what information to discard from the cell state.
   Formula: ft = sigmoid(Wf · [ht-1, xt] + bf)
   Output: values between 0 (forget completely) and 1 (keep completely)

b) Input Gate:
   Decides what new information to store in the cell state.
   Input gate: it = sigmoid(Wi · [ht-1, xt] + bi)
   Candidate values: C̃t = tanh(WC · [ht-1, xt] + bC)
   Cell state update: Ct = ft · Ct-1 + it · C̃t

c) Output Gate:
   Decides what part of the cell state to output as hidden state.
   Output gate: ot = sigmoid(Wo · [ht-1, xt] + bo)
   Hidden state: ht = ot · tanh(Ct)

Advantages of LSTM:
• Solves vanishing gradient: Cell state allows gradients to flow unchanged over many time steps
• Long-range dependencies: Can remember information from hundreds of steps earlier
• Gating mechanism: Fine-grained control over what to remember and forget
• Widely used in: Machine translation, speech recognition, sentiment analysis, text generation`
            },
            {
                heading: "GRU (Gated Recurrent Unit)",
                body: `GRU is a simplified variant of LSTM with fewer parameters. It combines the forget
and input gates into a single update gate and merges the cell state and hidden state.

GRU Gates:
  Reset Gate (rt): Controls how much of the previous hidden state to use when
    computing candidate hidden state
  Update Gate (zt): Controls how much of the previous hidden state to keep vs
    update with new candidate

Equations:
  Candidate hidden state: h̃t = tanh(W · [rt · ht-1, xt])
  Final hidden state: ht = (1 - zt) · ht-1 + zt · h̃t

GRU for Language Modeling — Key Steps:
  1. Input: Model takes a sequence of words, one at a time
  2. Embedding: Each word is converted into a dense vector representation
  3. GRU Layer: Processes input sequence, capturing long-term dependencies
  4. Output Layer: Final hidden state fed into output layer for probability distribution over vocabulary
  5. Training: Model minimizes cross-entropy loss between predicted and actual next words

Advantages of GRU:
• Fewer parameters than LSTM — faster to train
• Effective at capturing long-range dependencies
• Comparable performance to LSTM on many tasks
• Less prone to overfitting on smaller datasets`
            },
            {
                heading: "LSTM vs GRU Comparison",
                body: `Feature        | LSTM                        | GRU
---------------+-----------------------------+---------------------------
Gates          | 3 (forget, input, output)   | 2 (reset, update)
Cell State     | Separate cell + hidden state| Single hidden state
Parameters     | More parameters             | Fewer parameters
Training Speed | Slower                      | Faster
Performance    | Better for very long seq    | Comparable on most tasks
Use Case       | Complex NLP tasks           | Resource-constrained settings`
            }
        ]
    },
    {
        rank: 37, module: "M5", freq: 0, title: "Transformer Architecture & Attention",
        subtitle: "Self-Attention, Q/K/V, Multi-Head, Encoder-Decoder, Positional Encoding",
        color: "#ff4444", badge: "📝 ADDED",
        content: [
            {
                heading: "From RNNs to Transformers",
                body: `Limitations of RNNs/LSTMs/GRUs that Transformers solve:
• Sequential processing: Cannot parallelize training (slow)
• Long-range dependencies: Gradient vanishing/exploding over long sequences
• Fixed context window: Limited memory of distant words

Transformers are a neural network architecture based entirely on attention
mechanisms, introduced in the paper "Attention Is All You Need" (Vaswani et al., 2017).
They have become the dominant architecture in NLP, replacing RNNs in most tasks.

Key Innovation: Access all positions in the input sequence simultaneously and
weigh their importance dynamically.
Self-Attention: The model learns which words in a sentence are related to each
other, regardless of distance.`
            },
            {
                heading: "Core Components of a Transformer",
                body: `1. Input Embeddings:
   Input text is tokenized into words or sub-words, each embedded into a continuous
   vector representation. This step captures semantic and syntactic information.

2. Positional Encoding:
   Since transformers process all tokens in parallel (no sequential order), positional
   encodings are added to input embeddings to encode the position/order of tokens
   in the sequence. Uses sine/cosine functions or learned embeddings.

3. Encoder:
   Analyzes the input text and creates hidden states representing context and meaning.
   Each encoder layer has two sub-components:
   • Self-Attention Mechanism: Weighs the importance of different tokens relative to each other
   • Feed-Forward Neural Network: Applies non-linear transformations to add abstraction

4. Decoder (in encoder-decoder transformers):
   The decoder generates output sequences. It has:
   • Masked Multi-Head Attention: Prevents attending to future tokens (used during training)
   • Cross-Attention: Attends to encoder output to incorporate source context
   • Feed-Forward Network: Same as encoder

5. Layer Normalization and Residual Connections:
   Residual connections (Add & Norm) help stabilize training by reducing
   vanishing/exploding gradient problems and improving convergence.`
            },
            {
                heading: "Self-Attention Mechanism (Detailed)",
                body: `Self-attention enables the model to evaluate each word's significance within the
full input sequence. It computes relationships between all token pairs simultaneously.

Query (Q), Key (K), Value (V) matrices are computed from input embeddings.

Attention Score Formula:
  Attention(Q, K, V) = softmax(QK^T / √dk) · V

Where dk = dimension of key vectors (used for scaling to prevent vanishing gradients)

Multi-Head Attention:
Multiple attention heads run in parallel, each learning different types of
relationships (syntax, semantics, coreference):
• Each head has its own Q, K, V projections
• Outputs from all heads are concatenated and linearly projected
• Allows model to attend to information from different representation subspaces`
            },
            {
                heading: "Architecture Variants & Advantages",
                body: `Architecture Variants:
• Encoder-Decoder: Original design for translation (e.g., original Transformer)
• Encoder-only: For understanding tasks (BERT, RoBERTa)
• Decoder-only: For generation tasks (GPT series)

Advantages of Transformers:
1. Parallel Processing: Entire input processed at once — much faster than RNNs
2. Long-Range Dependencies: Self-attention connects all token pairs directly,
   regardless of distance
3. State-of-the-Art Performance: Best results on machine translation,
   summarization, QA, etc.
4. Scalability: Performance improves consistently with more data and parameters

Transformer vs RNN Comparison:
Aspect           | N-grams / RNN         | Transformers / BERT
-----------------+-----------------------+--------------------------
Context Window   | Fixed (N-1 words)     | Full sequence (attention)
Long-range Deps  | Poor                  | Excellent
Training Data    | Requires smoothing    | Handles unseen combinations via embeddings
Parallelization  | N/A / Sequential      | Highly parallelizable
Pre-training     | Statistical counts    | Deep representation learning
Fine-tuning      | Not applicable        | Essential for task adaptation`
            }
        ]
    },
    {
        rank: 38, module: "M5", freq: 0, title: "BERT, Transfer Learning & LLMs",
        subtitle: "BERT Architecture, MLM/NSP, GPT, RoBERTa, Fine-tuning Strategies",
        color: "#ff4444", badge: "📝 ADDED",
        content: [
            {
                heading: "BERT — Architecture & Pre-training",
                body: `BERT (Bidirectional Encoder Representations from Transformers) is a pre-trained
transformer-based model developed by Google. It uses only the encoder part of
the transformer and processes text bidirectionally — considering both left and
right context simultaneously.

Architecture Details:
• BERT-Base: 12 layers, 768 hidden units, 12 attention heads, 110M parameters
• BERT-Large: 24 layers, 1024 hidden units, 16 attention heads, 340M parameters

Pre-training Tasks:
1. Masked Language Modeling (MLM):
   • Randomly masks 15% of words in input
   • Model predicts original words based on context
   • Example: "The cat sat on the [MASK]" → predicts "mat"
   • Allows bidirectional context learning
   • Limitation: Creates mismatch between pre-training and fine-tuning (no [MASK] tokens at inference)

2. Next Sentence Prediction (NSP):
   • Given two sentences (A, B), predicts if B actually follows A
   • Helps model understand sentence-level relationships
   • Useful for tasks like QA, text entailment, summarization
   • Limitation: Found to add noise in some cases; RoBERTa removes this task

BERT Fine-tuning Applications:
• Text Classification: Use [CLS] token representation
• Named Entity Recognition (NER): Token-level predictions
• Question Answering: Predict start/end spans of answers

Limitations of BERT:
• Processes text in chunks due to memory limitations — lacks context for very long texts
• No built-in memory mechanism to retain information across chunks
• Computationally expensive to pre-train from scratch
• Maximum input length of 512 tokens`
            },
            {
                heading: "GPT (Generative Pre-trained Transformer)",
                body: `GPT is a transformer-based language model developed by OpenAI. Unlike BERT
which uses the encoder, GPT uses only the decoder stack and is trained
autoregressively — predicting the next token given all previous tokens.

GPT Architecture Components:
• Input Embedding: Raw text tokenized; each token converted to dense vector via embedding layer
• Positional Encoding: Added to embeddings to preserve token order
• Transformer Blocks (repeated N times):
  - Self-Attention System: Evaluates each word's significance in full sequence context
  - Layer Normalization and Residual Connections: Stabilize training
  - Feedforward Neural Networks: Process attention output; add abstraction
• Output: Linear layer + Softmax to produce probability distribution over vocabulary

GPT vs BERT: Key Differences:
• GPT uses Decoder (unidirectional — left to right), BERT uses Encoder (bidirectional)
• GPT is generative (produces text), BERT is discriminative (understands/classifies text)
• GPT uses causal (masked) self-attention; cannot see future tokens during training
• GPT fine-tunes with same architecture; BERT adds task-specific head`
            },
            {
                heading: "RoBERTa (Robustly Optimized BERT)",
                body: `RoBERTa is a variant of BERT developed by Facebook AI Research. It uses the
same transformer encoder architecture but with key training improvements.

Key Differences from BERT:
1. Dynamic Masking: RoBERTa changes the masking pattern every epoch (BERT uses
   fixed masking) — encourages better generalization
2. No NSP Task: RoBERTa drops Next Sentence Prediction, finding it adds noise
   rather than helping
3. More Training Data: Trained on 160GB data vs BERT's 16GB
4. Larger Batch Size: Uses larger batch sizes for more robust training
5. More Training Steps: Trained for more iterations

BERT vs RoBERTa Comparison:
Feature               | BERT            | RoBERTa
----------------------+-----------------+---------------------
Masking Strategy      | Static (fixed)  | Dynamic (per epoch)
Next Sentence Pred    | Included        | Omitted
Training Data         | 16 GB           | 160 GB
Batch Size            | Smaller         | Larger
Training Steps        | Fewer           | More
Performance           | Strong          | State-of-the-art

Other BERT Variants:
• ALBERT: Parameter reduction techniques for memory efficiency
• DistilBERT: Smaller, faster version retaining 97% of performance

When to Use:
• Use BERT: Well-established baseline, large training data, fine-tuning for specific task
• Use RoBERTa: Better performance needed, limited training data, faster inference`
            },
            {
                heading: "Transfer Learning in NLP",
                body: `Transfer learning is a ML technique where a model trained on one task is
re-used as a starting point for a related task. In NLP, this involves
leveraging knowledge from a large dataset to improve performance on smaller,
specific tasks.

The Paradigm Shift:
Old approach: Train models from scratch for each task (requires massive labeled data)
New approach:
  1. Pre-training: Learn general language representations from unlabeled text (self-supervised)
  2. Fine-tuning: Adapt to specific tasks with small labeled datasets

Why it Works:
Pre-trained models capture universal language features (syntax, semantics, world knowledge).
Fine-tuning requires only task-specific adjustments to output layers or internal representations.

Key Techniques:
1. Pre-trained Language Models (PLMs): Models like BERT, GPT, RoBERTa are pre-trained
   on massive text corpora and then fine-tuned for specific downstream tasks.
   Benefits: reduced training time, better performance with less labeled data.

2. Feature Extraction: Pre-trained model weights are frozen; outputs (embeddings)
   are used as features for other models. Useful when training data is very limited.

3. Domain Adaptation: Fine-tune a general-purpose model on domain-specific text
   (e.g., medical, legal) before task-specific fine-tuning. Bridges the gap between
   general and specialized language.`
            },
            {
                heading: "Quick Reference — Model Comparison",
                body: `Model   | Type       | Direction      | Key Feature       | Best For
--------+------------+----------------+-------------------+-------------------
N-gram  | Statistical| Forward only   | Count-based       | Simple text analysis
RNN     | Neural     | Forward only   | Hidden state      | Short sequences
GRU     | Neural     | Forward only   | 2 gates, simpler  | Efficient seq modeling
LSTM    | Neural     | Forward only   | Cell state+3 gates| Long sequences
Transf. | Bidirect.  | Self-attention | Parallel           | All NLP tasks
BERT    | Transf.Enc | Bidirectional  | MLM + NSP         | Understanding tasks
RoBERTa | Transf.Enc | Bidirectional  | Optimized BERT    | Better classification
GPT     | Transf.Dec | Left-to-right  | Autoregressive    | Text generation`
            }
        ]
    },
    // ==================== MODULE 6 ADDITIONS ====================
    {
        rank: 39, module: "M6", freq: 4, title: "Information Retrieval vs Extraction",
        subtitle: "Differences and comparison",
        color: "#17a2b8", badge: "📝 ADDED",
        content: [
            {
                heading: "IR vs IE",
                body: `Information Retrieval (IR) is the process of finding and returning relevant documents from a large collection in response to a user query. Its output is usually a ranked list of web pages, files, articles, or snippets.

Information Extraction (IE), on the other hand, extracts structured information such as names, dates, locations, organizations, and relations from unstructured text. So, IR tells us which documents are relevant, while IE tells us what important facts are present inside those documents.`
            },
            {
                heading: "Comparison",
                body: `- IR: retrieves relevant documents
- IE: extracts facts from documents
- IR output: documents/snippets/passages
- IE output: structured entities, attributes, relations
- IR goal: locate useful sources
- IE goal: convert text into structured knowledge

In many real systems, IR and IE work together: first IR finds relevant documents, then IE extracts useful facts from them.`
            }
        ]
    },
    {
        rank: 40, module: "M6", freq: 1, title: "IR System Fundamentals",
        subtitle: "Architecture and traditional DB search diff",
        color: "#17a2b8", badge: "📝 ADDED",
        content: [
            {
                heading: "Architecture of IR system",
                body: `The main purpose of an Information Retrieval system is to satisfy a user’s information need by locating relevant material from a large collection.

1. User Interface – user enters query
2. Query Processing – analyze terms and phrases
3. Indexing – organize document terms for fast access
4. Document Collection – web pages, books, articles, etc.
5. Ranking – score documents by relevance
6. Retrieval – show top-ranked documents
7. Feedback/Refinement – improve future results based on interaction`
            },
            {
                heading: "IR vs Traditional Database Search",
                body: `Traditional database search works on structured data and usually requires precise queries, often with exact conditions. The result is a set of records that either match or do not match the query.

Information Retrieval, in contrast, usually works on unstructured or semi-structured text such as documents and web pages. It handles ambiguity better and returns a ranked list of relevant documents instead of exact table rows.`
            }
        ]
    },
    {
        rank: 41, module: "M6", freq: 1, title: "Boolean and Vector Space Models in IR",
        subtitle: "Differences with examples",
        color: "#17a2b8", badge: "📝 ADDED",
        content: [
            {
                heading: "Boolean Model",
                body: `In the Boolean model, documents are retrieved using logical operators such as AND, OR, NOT. A document either satisfies the query or does not; there is no natural ranking.
Example: Query = “NLP AND plagiarism”
Only documents containing both terms are returned.`
            },
            {
                heading: "Vector Space Model",
                body: `In the Vector Space Model (VSM), documents and queries are represented as vectors. Relevance is calculated using weights such as TF-IDF and similarity measures such as cosine similarity. This allows partial matching and ranking of documents.
Example: For query “NLP plagiarism detection”, a document containing all three terms many times gets a higher score than one containing only one or two terms.`
            },
            {
                heading: "Key differences",
                body: `- Boolean model gives exact match, VSM gives ranked retrieval
- Boolean model uses logical conditions, VSM uses term weights and similarity
- Boolean model is rigid, VSM is more flexible for natural-language search`
            }
        ]
    },
    {
        rank: 42, module: "M6", freq: 1, title: "Named Entity Recognition (NER)",
        subtitle: "Detailed explanation",
        color: "#17a2b8", badge: "📝 ADDED",
        content: [
            {
                heading: "What is NER?",
                body: `Named Entity Recognition (NER) is the NLP task of identifying and classifying named entities in raw text into predefined categories. The core categories mentioned in the notes are Person, Location, and Organization, and the notes also mention categories like date/time, money, email, phone number, URL, and address.

NER generally involves two steps:
1. Entity identification – detect the word or phrase that is an entity
2. Entity classification – assign the correct label such as person, place, or organization. The notes mention both rule-based approaches and HMM-based approaches for NER.

NER is important in information extraction, question answering, machine translation, and knowledge-base construction because it converts plain text into structured semantic units.`
            }
        ]
    },
    {
        rank: 43, module: "M6", freq: 1, title: "Plagiarism Detection",
        subtitle: "Forms and types of detection",
        color: "#17a2b8", badge: "📝 ADDED",
        content: [
            {
                heading: "What is plagiarism detection?",
                body: `Plagiarism detection is the process of identifying text that has been copied, closely paraphrased, translated, or reused without proper attribution. It compares the given content with existing sources such as websites, research articles, and document collections.`
            },
            {
                heading: "Forms of plagiarism",
                body: `- Direct plagiarism – word-for-word copying
- Paraphrasing plagiarism – rewording without credit
- Mosaic plagiarism – mixing copied and original text
- Self-plagiarism – reusing one’s own earlier work
- Accidental plagiarism – unintentional failure to cite properly`
            },
            {
                heading: "Types of plagiarism detection",
                body: `- Monolingual plagiarism detection
  - Intrinsic: detects style inconsistency within the same document
  - Extrinsic: compares the document against external sources
- Cross-lingual plagiarism detection: detects copied content that has been translated from one language to another.`
            }
        ]
    },
    {
        rank: 44, module: "M6", freq: 3, title: "Text Categorization (Text Classification)",
        subtitle: "Types, Pipeline, Feature Extraction, 3 Approaches, Applications",
        color: "#66bb6a", badge: "🏷️ CLASSIFICATION",
        content: [
            {
                heading: "Definition",
                body: `Text Categorization (Text Classification) is the process of categorizing text into
predefined categories or labels.

• Analyzes content to assign classes: spam vs. non-spam, sentiment (positive/negative/neutral)
• Applications: Email filtering, sentiment analysis, topic categorization, language identification

Types of Text Classification:
Type               | Description                             | Example
-------------------+-----------------------------------------+--------------------------------
Binary             | Two classes only                        | Sentiment: Positive vs Negative
Multi-class        | More than two categories, one per text  | News: Sports, Politics, Entertainment, Technology
Multi-label        | Multiple classes simultaneously         | Academic paper: AI, Machine Learning, Data Science`
            },
            {
                heading: "Text Classification Pipeline",
                body: `1. DATA COLLECTION
   Gather data from various sources

2. DATA PREPROCESSING
   • Lowercasing: "Text" and "text" treated same
   • Removing Noise: Eliminate special chars, punctuation, numbers
   • Tokenization: Split into words/phrases
     "The cats are running" → ["The", "cats", "are", "running"]
   • Stopword Removal: Remove common words ("the", "and", "is")
   • Stemming/Lemmatization: Reduce to base form
     "running" → "run", "cats" → "cat"
     Example: "The cats are running quickly" → ["cat", "run", "quick"]

3. TEXT REPRESENTATION (Feature Extraction)
   • Bag of Words (BoW): Sparse vector of word frequencies
   • TF-IDF: Weigh words by importance across dataset (important words get higher weight)
   • Word Embeddings: Dense vectors (Word2Vec, GloVe, FastText) — similar meanings = similar vectors
   • BERT/Transformer: Contextual embeddings — context-aware representations

4. MODEL SELECTION
   • Naive Bayes, SVM, Logistic Regression, Random Forest
   • Deep Learning: RNN, LSTM, CNN, Transformers

5. TRAINING
   • Split data, Optimize, Evaluate on validation, Tune hyperparams

6. MODEL EVALUATION
   • Accuracy, Precision, Recall, F1-Score
   • Confusion Matrix, ROC/AUC

7. PREDICTION
   Classify new unseen text`
            },
            {
                heading: "Three Approaches to Text Classification",
                body: `Approach 1: Machine Learning with NLP Features
• Preprocessing: Tokenize, clean, remove stopwords, lowercase
• Feature Extraction: TF, TF-IDF, n-grams, custom features (text length, word length, exclamation points)
• Model: SVM or Logistic Regression
• Training: On labeled data with extracted features
• Prediction: Category based on features

Approach 2: Deep Learning
• Preprocessing: Tokenize, pad sequences for uniform length
• Text Representation: Word embeddings (Word2Vec, GloVe, random init)
• Model Architecture: RNN, LSTM, or 1D CNN
• Training: Learn word dependencies over multiple epochs
• Prediction: Based on learned word patterns

Approach 3: Fine-tuning LLM
• Preprocessing: Use pre-trained BERT/GPT tokenizer
• Fine-tuning: Fine-tune on small labeled dataset;
  Freeze lower layers, fine-tune last few layers
• Training: Few epochs on specific dataset
• Prediction: Based on learned context and meaning
• Advantage: Captures deep semantic patterns, minimal data needed`
            },
            {
                heading: "Example: Spam Detection Pipeline",
                body: `1. Data Collection: Gather emails labeled "spam" and "not spam"
2. Data Preprocessing: Tokenize, clean, remove special characters and stopwords
3. Text Representation: Use TF-IDF to convert to numerical vectors
4. Model Selection: Choose Naive Bayes classifier
5. Training: Train on labeled emails
6. Evaluation: Measure accuracy, precision, recall, F1-score on test set
7. Prediction: Classify new emails

Custom Features for News Classification:
Feature               | Description
----------------------+--------------------------------------------
Word Count            | Total words in article
Headline Length       | Words/characters in headline
Named Entity Count    | People, organizations, locations mentioned
Sentiment Score       | Polarity (positive/neutral/negative)
Category Keywords     | Presence of category-specific terms
POS Tag Count         | Specific parts of speech counts
Topic Distribution    | LDA topic probabilities
Quote Count           | Direct quotes (indicates interviews)`
            },
            {
                heading: "Applications of Text Classification",
                body: `Application              | Description
-------------------------+-------------------------------------------
Spam Classification      | Sort emails into spam/non-spam
News/Blog Categorization | Classify articles into topics
Customer Support         | Route requests by topic to appropriate department
Hate Speech Detection    | Flag inappropriate content for review`
            }
        ]
    }
];

export default function NLPStudyGuide() {
    const [selected, setSelected] = useState(null);
    const [filter, setFilter] = useState("all");
    const [hovered, setHovered] = useState(null);

    const getColor = (mod) => MODULE_COLORS[mod] || "#888";
    const filtered = filter === "all" ? topics : topics.filter(t => t.module === filter);
    const activeFilterColor = filter === "all" ? "#e94560" : getColor(filter);
    const selectedRef = useRef(null);

    useEffect(() => {
        if (selected !== null && selectedRef.current) {
            setTimeout(() => {
                selectedRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
            }, 50);
        }
    }, [selected]);

    return (
        <div style={{ fontFamily: "'Inter', sans-serif", background: "#0a0a14", minHeight: "100vh", color: "#e8e8f0", padding: "0" }}>
            <style>{`
                @keyframes fadeSlideIn {
                    from { opacity: 0; transform: translateY(-10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @keyframes pulseGlow {
                    0%, 100% { box-shadow: 0 0 8px var(--glow-color, transparent); }
                    50% { box-shadow: 0 0 16px var(--glow-color, transparent); }
                }
                * { box-sizing: border-box; margin: 0; padding: 0; }
                body { background: #0a0a14; }
                ::-webkit-scrollbar { width: 6px; }
                ::-webkit-scrollbar-track { background: #0a0a14; }
                ::-webkit-scrollbar-thumb { background: #2a2a4a; border-radius: 3px; }
                @media (max-width: 768px) {
                    .site-header {
                        position: relative !important;
                        padding: 16px 14px 14px !important;
                    }
                    .site-header h1 { font-size: 22px !important; }
                    .site-header .college-tag { font-size: 8px !important; letter-spacing: 3px !important; margin-bottom: 4px !important; }
                    .site-header .subtitle { font-size: 11px !important; margin-top: 4px !important; }
                    .filter-row { margin-top: 10px !important; gap: 6px !important; }
                    .filter-row button { padding: 4px 12px !important; font-size: 11px !important; }
                }
            `}</style>

            {/* ── Header ── */}
            <div className="site-header" style={{
                background: "linear-gradient(135deg, rgba(26,26,46,0.92) 0%, rgba(22,33,62,0.92) 50%, rgba(15,52,96,0.92) 100%)",
                backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)",
                padding: "28px 24px 22px", borderBottom: "1px solid #2a2a4a",
                position: "sticky", top: 0, zIndex: 100
            }}>
                <div style={{ maxWidth: 920, margin: "0 auto" }}>
                    <div className="college-tag" style={{ fontSize: 10, color: "#e94560", letterSpacing: 5, textTransform: "uppercase", marginBottom: 8, fontWeight: 500 }}>
                        PILLAI COLLEGE OF ENGINEERING · NLP · SEM VI · 2025-26
                    </div>
                    <h1 style={{ margin: 0, fontSize: 28, color: "#fff", fontWeight: 700, letterSpacing: 0.5 }}>
                        NLP Exam Priority Study Guide
                    </h1>
                    <div className="subtitle" style={{ color: "#7878a0", marginTop: 6, fontSize: 13, fontWeight: 400 }}>
                        {topics.length} topics across M1–M6 ranked by exam frequency • Based on PYQ analysis
                    </div>
                    <div className="filter-row" style={{ marginTop: 16, display: "flex", gap: 8, flexWrap: "wrap" }}>
                        {["all", "M1", "M2", "M3", "M4", "M5", "M6"].map(m => {
                            const btnColor = m === "all" ? "#e94560" : getColor(m);
                            const isActive = filter === m;
                            return (
                                <button key={m}
                                    onClick={() => { setFilter(m); setSelected(null); }}
                                    style={{
                                        padding: "6px 18px", borderRadius: 20,
                                        border: `1.5px solid ${isActive ? btnColor : "#2a2a4a"}`,
                                        background: isActive ? btnColor : "rgba(255,255,255,0.03)",
                                        color: isActive ? "#fff" : "#8888aa",
                                        cursor: "pointer", fontSize: 12, fontWeight: 500,
                                        letterSpacing: 0.8, fontFamily: "'Inter', sans-serif",
                                        transition: "all 0.2s ease",
                                        boxShadow: isActive ? `0 0 12px ${btnColor}44` : "none"
                                    }}
                                >
                                    {m === "all" ? "ALL" : m}
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* ── Main Content ── */}
            <div style={{ maxWidth: 920, margin: "0 auto", padding: "24px 16px 40px" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    {filtered.map(topic => {
                        const color = getColor(topic.module);
                        const isSelected = selected === topic.rank;
                        const isHovered = hovered === topic.rank;
                        const isHighFreq = topic.freq >= 7;

                        return (
                            <div key={topic.rank}
                                ref={isSelected ? selectedRef : null}
                                style={{ scrollMarginTop: 140 }}
                            >
                                <div
                                    onClick={() => setSelected(isSelected ? null : topic.rank)}
                                    onMouseEnter={() => setHovered(topic.rank)}
                                    onMouseLeave={() => setHovered(null)}
                                    style={{
                                        background: isSelected
                                            ? `linear-gradient(90deg, rgba(30,30,60,0.95) 0%, rgba(20,20,45,0.95) 100%)`
                                            : isHovered
                                                ? "rgba(25,25,50,0.9)"
                                                : "rgba(18,18,35,0.85)",
                                        border: `1px solid ${isSelected ? color : isHovered ? `${color}66` : "#1e1e3a"}`,
                                        borderLeft: `4px solid ${color}`,
                                        borderRadius: 10, padding: "14px 18px", cursor: "pointer",
                                        display: "flex", alignItems: "center", gap: 14,
                                        transition: "all 0.25s ease",
                                        transform: isHovered && !isSelected ? "translateX(3px)" : "none",
                                        boxShadow: isHighFreq
                                            ? `0 0 18px ${color}18`
                                            : isSelected ? `0 0 20px ${color}22` : "none"
                                    }}
                                >
                                    {/* Rank Circle */}
                                    <div style={{
                                        width: 38, height: 38, borderRadius: "50%",
                                        background: `${color}15`, border: `2px solid ${color}`,
                                        display: "flex", alignItems: "center", justifyContent: "center",
                                        flexShrink: 0, color: color, fontWeight: 700, fontSize: 12
                                    }}>
                                        #{topic.rank}
                                    </div>

                                    {/* Title + Subtitle */}
                                    <div style={{ flex: 1, minWidth: 0 }}>
                                        <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                                            <span style={{ fontWeight: 600, fontSize: 15, color: "#fff" }}>{topic.title}</span>
                                            <span style={{
                                                background: `${color}18`, color: color,
                                                padding: "2px 10px", borderRadius: 10,
                                                fontSize: 10, fontWeight: 600, letterSpacing: 0.8,
                                                fontFamily: "'JetBrains Mono', monospace"
                                            }}>{topic.module}</span>
                                            <span style={{ fontSize: 10, color: color, fontWeight: 500 }}>{topic.badge}</span>
                                        </div>
                                        <div style={{ color: "#6a6a8e", fontSize: 12, marginTop: 3, fontWeight: 400 }}>{topic.subtitle}</div>
                                    </div>

                                    {/* Frequency */}
                                    <div style={{ textAlign: "right", flexShrink: 0 }}>
                                        {topic.freq === 0 ? (
                                            <div style={{
                                                color: "#66bb6a", fontWeight: 700, fontSize: 11,
                                                background: "rgba(102,187,106,0.12)",
                                                padding: "3px 8px", borderRadius: 6, letterSpacing: 0.5
                                            }}>NEW</div>
                                        ) : (
                                            <>
                                                <div style={{ color: color, fontWeight: 700, fontSize: 18 }}>{topic.freq}</div>
                                                <div style={{ color: "#4a4a6a", fontSize: 9, fontWeight: 500, letterSpacing: 1, textTransform: "uppercase" }}>freq</div>
                                            </>
                                        )}
                                    </div>

                                    {/* Chevron */}
                                    <div style={{
                                        color: color, fontSize: 14,
                                        transform: isSelected ? "rotate(90deg)" : "rotate(0deg)",
                                        transition: "transform 0.25s ease", flexShrink: 0, opacity: 0.7
                                    }}>▶</div>
                                </div>

                                {/* ── Expanded Content ── */}
                                {isSelected && (
                                    <div style={{
                                        background: "rgba(12,12,25,0.96)",
                                        border: `1px solid ${color}30`, borderTop: "none",
                                        borderRadius: "0 0 10px 10px",
                                        padding: "24px 22px 18px", marginTop: -6,
                                        animation: "fadeSlideIn 0.3s ease"
                                    }}>
                                        {topic.content.map((section, i) => (
                                            <div key={i} style={{ marginBottom: 22 }}>
                                                <div style={{
                                                    color: color, fontWeight: 600, fontSize: 14,
                                                    letterSpacing: 0.5,
                                                    marginBottom: 10, paddingBottom: 8,
                                                    borderBottom: `1px solid ${color}25`,
                                                    display: "flex", alignItems: "center", gap: 8
                                                }}>
                                                    <span style={{
                                                        width: 3, height: 16, borderRadius: 2,
                                                        background: color, display: "inline-block", flexShrink: 0
                                                    }}></span>
                                                    {section.heading}
                                                </div>
                                                <pre style={{
                                                    fontFamily: "'JetBrains Mono', 'Courier New', monospace",
                                                    fontSize: 13, color: "#c0c0d8", margin: 0,
                                                    whiteSpace: "pre-wrap", lineHeight: 1.75,
                                                    background: "rgba(255,255,255,0.025)",
                                                    padding: "14px 16px", borderRadius: 8,
                                                    border: "1px solid #1c1c38",
                                                    borderLeft: `3px solid ${color}30`
                                                }}>
                                                    {section.body}
                                                </pre>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>

                {/* ── Quick Exam Tips ── */}
                <div style={{
                    marginTop: 40, background: "rgba(18,18,35,0.85)",
                    border: "1px solid #1e1e3a", borderRadius: 12, padding: "22px 24px"
                }}>
                    <div style={{
                        color: "#e94560", fontSize: 11, fontWeight: 600,
                        letterSpacing: 3, textTransform: "uppercase", marginBottom: 16
                    }}>Quick Exam Tips</div>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 10 }}>
                        {[
                            { tip: "Bigram prob: C(w₁,w₂)/C(w₁)", tag: "M5" },
                            { tip: "Lesk = max overlap context vs dict definition", tag: "M4" },
                            { tip: "Hobbs = breadth-first left-to-right on parse tree", tag: "M4" },
                            { tip: "5 Pragmatics: Deixis, Implicature, Presupposition, Speech Acts, Conv. Structure", tag: "M4" },
                            { tip: "HMM: hidden tags + observed words → Viterbi decoding", tag: "M3" },
                            { tip: "Stemming → non-word (Studi); Lemmatization → real word (Study)", tag: "M2" },
                            { tip: "Inflection: same category; Derivation: new category + new word", tag: "M2" },
                            { tip: "5 NLP Stages: Lexical→Syntactic→Semantic→Discourse→Pragmatic", tag: "M1" },
                            { tip: "6 Ambiguity Levels: Phonetic, Lexical, Syntactic, Semantic, Pragmatic, Referential", tag: "M1" },
                            { tip: "Top-Down: S→words; Bottom-Up: words→S (Shift-Reduce)", tag: "M3" },
                            { tip: "BoW = word counts; TF-IDF = weighted by rarity; Word2Vec = dense prediction", tag: "M2" },
                            { tip: "Extractive = existing sentences; Abstractive = new sentences (Seq2Seq/Transformers)", tag: "M6" },
                        ].map((item, i) => {
                            const tipColor = getColor(item.tag);
                            return (
                                <div key={i} style={{
                                    background: "rgba(255,255,255,0.025)",
                                    border: `1px solid ${tipColor}20`,
                                    borderLeft: `3px solid ${tipColor}60`,
                                    borderRadius: 8, padding: "12px 14px"
                                }}>
                                    <div style={{
                                        color: tipColor, fontSize: 10, fontWeight: 600,
                                        letterSpacing: 1.2, marginBottom: 5
                                    }}>{item.tag}</div>
                                    <div style={{ color: "#a8a8c8", fontSize: 12.5, lineHeight: 1.55, fontWeight: 400 }}>{item.tip}</div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}