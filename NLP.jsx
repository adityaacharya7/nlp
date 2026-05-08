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
        subtitle: "Extractive vs. Abstractive",
        color: "#28a745", badge: "📝 2024-25 TREND",
        content: [
            {
                heading: "Extractive vs Abstractive",
                body: `Extractive = select and combine EXISTING sentences from source text.
→ No new words; existing sentences pulled out.

Abstractive = GENERATE new sentences capturing the essence.
→ Like how humans summarize — paraphrase, shorten, synthesize.`
            },
            {
                heading: "Extractive vs Abstractive Comparison",
                body: `Feature          | Extractive              | Abstractive
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
        subtitle: "Techniques, Challenges",
        color: "#17a2b8", badge: "📊 STANDARD",
        content: [
            {
                heading: "Types of Sentiment Analysis",
                body: `1. Standard SA: Positive / Neutral / Negative
2. Fine-Grained SA: Very Positive → Very Negative
3. Emotion Detection: Happiness, Anger, Sadness, Fear
4. Aspect-Based SA: Sentiment about specific features
   "Battery life is too short but camera is great."
   → Battery: Negative, Camera: Positive
5. Intent Detection: "Instagram keeps closing. Help?" → Request for Assistance
6. Sarcasm/Irony: "Oh wonderful, traffic is moving slower." → Sarcasm`
            },
            {
                heading: "Techniques & Challenges",
                body: `TECHNIQUES:
1. Rule-Based (Lexicon): Lexicon of +/- words → count → score
2. Automated (ML): TF-IDF/BoW features → train → predict
3. Hybrid: Combine both

CHALLENGES:
1. Subjectivity: "The laptop is good" (subjective) vs "The laptop is small" (objective)
2. Irony & Sarcasm: "Magnificent service" said sarcastically
3. Emojis: 😊 vs 😡 → carry sentiment, hard to process
4. Idioms: "Not my cup of tea" → negative, literal meaning unrelated
5. Negation: "I can't not buy another Apple Mac" → double negative = positive
6. Neutrality: "This laptop is black" → no sentiment`
            }
        ]
    },
    {
        rank: 23, module: "M6", freq: 7, title: "Question Answering Systems",
        subtitle: "Types, 3 Stages, Challenges",
        color: "#6f42c1", badge: "💬 STANDARD",
        content: [
            {
                heading: "3 Stages of QA",
                body: `1. QUESTION PROCESSING:
• Question Classification: Who/What/Where/When/How/Why
  "Who invented the telephone?" → expects a person's name
• NER: "What is the capital of France?" → "France" identified as location
• Syntactic Parsing + Semantic Understanding + Query Reformulation

2. ANSWER RETRIEVAL:
• IR-based: Match query against document corpus
• Knowledge Base: Query structured KBs (Wikidata, DBpedia)

3. ANSWER GENERATION:
• Extractive QA: Extract exact span from retrieved text
• Abstractive QA: Generate new answer (GPT, BERT)
• Response Refinement: Ensure clarity`
            },
            {
                heading: "Types & IR vs QA Comparison",
                body: `Types:
• Closed-domain: Specific topic only (medical QA)
• Open-domain: Any topic (like Google Search)
• Factoid: "What is the capital of Japan?" → "Tokyo"
• Descriptive: Long explanation required
• Yes/No, List, Complex (How/Why)

IR vs QA:
Aspect  | Information Retrieval  | Question Answering
--------+------------------------+-----------------------
Output  | Ranked list of docs    | Direct specific answer
Search  | Keyword matching       | Semantic understanding
Example | List of docs on topic  | "Temperature is 1.1°C"`
            }
        ]
    },
    {
        rank: 24, module: "M6", freq: 5, title: "Machine Translation",
        subtitle: "3 Types, Challenges",
        color: "#20c997", badge: "🌐 TRANSLATION",
        content: [
            {
                heading: "Three Types of MT",
                body: `1. RULE-BASED MT (RBMT):
   • Predefined linguistic rules + dictionaries
   • Three phases: Analysis → Transfer → Generation

2. STATISTICAL MT (SMT):
   • Learns from large parallel corpora
   • Uses probability to find best translation

3. NEURAL MT (NMT):
   • Deep learning (seq2seq + attention)
   • Most modern (e.g., Google Translate)

Challenges:
1. Ambiguity: "bank" → financial or river?
2. Syntax Differences: English (SVO) vs Japanese/Marathi (SOV)
3. Cultural Nuances: Idioms don't translate literally
4. Resource Scarcity: Low-resource languages lack parallel corpora`
            }
        ]
    },
    {
        rank: 25, module: "M6", freq: 5, title: "Information Retrieval",
        subtitle: "IR vs IE, Vector Space Model",
        color: "#fd7e14", badge: "🔍 COMPARISON",
        content: [
            {
                heading: "IR Components & Types",
                body: `IR = obtaining relevant documents from large collection based on user query.

Components: Document Collection, Indexing, Query Processing, Ranking (TF-IDF, BM25), Retrieval

Types:
1. Monolingual IR: Query and documents in SAME language
2. Cross-Lingual IR (CLIR): Query in one language, documents in another
3. Multilingual IR (MLIR): Documents in multiple languages

IR vs QA:
Aspect  | Information Retrieval  | Question Answering
--------+------------------------+-------------------------
Output  | Ranked list of docs    | Direct answer
Method  | Keyword matching       | Semantic understanding`
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
        subtitle: "Definition & usage",
        color: "#ff4444", badge: "📝 ADDED",
        content: [
            {
                heading: "Concept of perplexity",
                body: `Perplexity is a measure of how well a language model predicts a sequence of words. A lower perplexity means the model is less “surprised” by the test sentence and therefore predicts better; a higher perplexity means poorer prediction. Intuitively, perplexity tells us how uncertain the model is while choosing the next word.

Perplexity is the exponential of the average negative log-probability assigned by the model to the test sequence. It is commonly used to compare language models; the one with lower perplexity is considered better on that dataset. Example: if Model A has lower perplexity than Model B on the same corpus, Model A predicts the word sequence more effectively.`
            }
        ]
    },
    {
        rank: 33, module: "M5", freq: 1, title: "Limitations of HMM in NLP",
        subtitle: "Markov assumption & dependencies",
        color: "#ff4444", badge: "📝 ADDED",
        content: [
            {
                heading: "Limitations",
                body: `The main weakness of Markov-based models is the Markov assumption: the next state/word depends only on a limited previous context. Because of this, such models cannot capture long-range dependencies or deep semantic structure in language.

Other limitations include data sparsity for larger contexts, sensitivity to noisy data, and the trade-off between context size and model complexity. As context length increases, the number of possible combinations grows rapidly, making storage and computation expensive. Compared with newer neural models and Transformers, Markov-style models are much weaker at modeling full-sequence meaning.`
            }
        ]
    },
    {
        rank: 34, module: "M5", freq: 2, title: "Fine-tuning in Pre-trained Models",
        subtitle: "Concept and process",
        color: "#ff4444", badge: "📝 ADDED",
        content: [
            {
                heading: "What is fine-tuning?",
                body: `Fine-tuning is the process of taking a model that has already been pre-trained on a very large corpus and then training it further on a smaller, task-specific dataset. This allows the model to adapt its general language knowledge to a specific task such as text classification, NER, or question answering.

In practice, a task-specific layer is added on top of the pre-trained model, and either all layers or only some upper layers are updated. Sometimes lower layers are frozen to preserve general knowledge while upper layers learn the target task.`
            }
        ]
    },
    {
        rank: 35, module: "M5", freq: 1, title: "Pre-training Techniques: MLM and NSP",
        subtitle: "Masked Language Modeling & Next Sentence Prediction",
        color: "#ff4444", badge: "📝 ADDED",
        content: [
            {
                heading: "MLM and NSP",
                body: `In Masked Language Modeling (MLM), some input tokens are randomly masked, and the model is trained to predict the missing words using both left and right context. This helps the model learn rich bidirectional language understanding.

In Next Sentence Prediction (NSP), the model is given two sentences and must predict whether the second logically follows the first. This helps the model learn sentence-level relationships and discourse coherence. Both MLM and NSP are core pre-training tasks associated with BERT-style models.`
            }
        ]
    },
    {
        rank: 36, module: "M5", freq: 0, title: "RNNs, LSTMs & GRUs",
        subtitle: "Recurrent models and gating mechanisms",
        color: "#ff4444", badge: "📝 ADDED",
        content: [
            {
                heading: "RNNs for language modeling & Limitations",
                body: `An RNN processes text sequentially, one token at a time, while maintaining a hidden state that carries information from previous tokens. This makes it suitable for language modeling, because the prediction of the next word can depend on earlier words in the sequence.

Its limitations are:
- vanishing gradient problem
- exploding gradient problem
- difficulty in learning long-range dependencies
- slow training, because sequence processing is not easily parallelized.`
            },
            {
                heading: "LSTM and GRU",
                body: `LSTM (Long Short-Term Memory) and GRU (Gated Recurrent Unit) are improved versions of RNNs designed to handle long-term dependencies better. They introduce gating mechanisms that control what information should be remembered, updated, or forgotten.

An LSTM uses a cell state with input, forget, and output gates, while a GRU is a simpler version with update and reset gates. These structures reduce the vanishing-gradient problem and help the model preserve important information over longer sequences.`
            }
        ]
    },
    {
        rank: 37, module: "M5", freq: 0, title: "Transformer Architecture & Attention",
        subtitle: "Self-attention and comparison with RNNs",
        color: "#ff4444", badge: "📝 ADDED",
        content: [
            {
                heading: "Attention Mechanism",
                body: `The Attention mechanism, especially self-attention, allows each word in a sequence to look at every other word and determine which ones are most relevant. This helps the model capture dependencies regardless of distance.

In Transformers, attention is computed using Query (Q), Key (K), and Value (V) vectors. The model calculates attention scores and uses them to produce context-aware representations. Multi-head attention allows the model to learn several types of relationships at the same time.`
            },
            {
                heading: "Transformer vs RNN-based models",
                body: `The Transformer architecture is based on self-attention instead of recurrence. Its major components include input embeddings, positional encoding, multi-head attention, feed-forward neural networks, layer normalization, and residual connections.

The main difference from RNNs is that Transformers process tokens in parallel, whereas RNNs process them sequentially. Transformers capture long-range dependencies more effectively through attention, while RNNs struggle with distant context and slower training.`
            }
        ]
    },
    {
        rank: 38, module: "M5", freq: 0, title: "BERT, Transfer Learning & LLMs",
        subtitle: "Pre-trained models, fine-tuning and GPT",
        color: "#ff4444", badge: "📝 ADDED",
        content: [
            {
                heading: "BERT Architecture & Applications",
                body: `BERT (Bidirectional Encoder Representations from Transformers) is a pre-trained language model developed by Google. It uses only the encoder stack of the Transformer and learns bidirectional context, meaning it considers both left and right context while understanding a word.

Its pre-training tasks are MLM and NSP. After pre-training, BERT can be fine-tuned for applications such as text classification, named entity recognition, and question answering.`
            },
            {
                heading: "Transfer Learning in NLP",
                body: `Transfer learning in NLP means reusing knowledge learned by a model on a large general corpus and applying it to a different but related task. Instead of training from scratch, we start with a powerful pre-trained model and adapt it.

For downstream tasks, a task-specific output layer is added and the model is trained on labeled data. Depending on the requirement, either the entire model is updated or only selected layers are fine-tuned. This reduces training cost and improves performance, especially when labeled data is limited.`
            },
            {
                heading: "Large Language Models (LLMs) & GPT",
                body: `Large Language Models (LLMs) are very large neural language models trained on massive text corpora to understand and generate human language. They can perform many NLP tasks such as text generation, summarization, QA, and translation.

GPT (Generative Pre-trained Transformer) uses the decoder-only Transformer architecture. It is trained autoregressively, meaning it predicts the next token based on previous tokens only. Its architecture includes token embeddings, positional encoding, masked self-attention, feed-forward layers, normalization, and residual connections.`
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