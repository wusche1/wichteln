import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js';
import { getDatabase, ref, set, get } from 'https://www.gstatic.com/firebasejs/9.14.0/firebase-database.js';

function hash(string) {
    const encoder = new TextEncoder();
    const data = encoder.encode(string);
    return crypto.subtle.digest('SHA-256', data).then(hashBuffer => {
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      //console.log(hashArray.map(b => b.toString(16).padStart(2, '0')).join(''));
      return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    });
  }

const firebaseConfig = {
  apiKey: "AIzaSyCktvSZnWLnUwNhUw06sn7FWlZmyxYJE6k",
  authDomain: "jaccuse--database.firebaseapp.com",
  projectId: "jaccuse--database",
  storageBucket: "jaccuse--database.appspot.com",
  messagingSenderId: "13135183427",
  appId: "1:13135183427:web:e26bcb6272cf2e88dddef6",
  measurementId: "G-WGTKD1F0MT",
  databaseURL: "https://jaccuse--database-default-rtdb.europe-west1.firebasedatabase.app"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

const jaccuseWordsRef = ref(db, 'jaccuse_words');

function loadJaccuseWords() {
  return get(jaccuseWordsRef).then((snapshot) => {
    if (snapshot.exists()) {
      const jaccuseWords = snapshot.val();
      //console.log(jaccuseWords);
      return jaccuseWords;
    } else {
      console.log("No jaccuse words available");
      return null;
    }
  });
}
async  function addJaccuseWord(word1, word2, author, tags) {
    const words = [word1, word2].sort(); // sort the words alphabetically
    const concatenatedWords = words.join(''); // concatenate the sorted words
    const compositeKey = await hash(concatenatedWords)
  
    const existingWordRef = ref(db, `jaccuse_words/${compositeKey}`);
    get(existingWordRef).then((snapshot) => {
      if (snapshot.exists()) {
        //console.log('Word already exists:', snapshot.val());
        return;
      } else {
        const newJaccuseWord = {
          word1: word1,
          word2: word2,
          author: author,
          tags: tags,
          played_users: [],
          n_plays: 0,
          n_upvote: 0
        };
  
        set(existingWordRef, newJaccuseWord);
        //console.log('Word added:', newJaccuseWord);
      }
    });
  }

  const words = [
    ["Terminator","Transformer",{ author: "wuschel", tags: ["AI_safety_beginner"] }],
    ["University","ML4good",{ author: "wuschel", tags: ["AI_safety_beginner", "place"] }],
    ["Machine Learning","pytorch",{ author: "wuschel", tags: ["AI_safety_beginner"] }],
    ["X-Risk", "The Singularity",{ author: "wuschel", tags: ["AI_safety_beginner"] }],
    ["Alan Turing","Sam Altman",{ author: "wuschel", tags: ["AI_safety_beginner", "person"] }],
    ["Nvidia","(Google) DeepMind",{ author: "wuschel", tags: ["AI_safety_beginner"] }],
    ["Paperclip Maximizer", "Instrumental Convergence",{ author: "wuschel", tags: ["AI_safety_advanced"] }],
    ["Reward Hacking", "Goodhart's Law",{ author: "wuschel", tags: ["AI_safety_advanced"] }],
    ["Nick Bostrom", "Stuart Russell",{ author: "wuschel", tags: ["AI_safety_advanced", "person"] }],
    ["Longtermism", "Effective Accelerationism (e/acc)",{ author: "wuschel", tags: ["AI_safety_advanced"] }],
    ["Attention Head", "Feature",{ author: "wuschel", tags: ["AI_safety_advanced"] }],
    ["Reward Function", "Gradient Descent",{ author: "wuschel", tags: ["AI_safety_advanced"] }],
    ["Paperclips", "Coherent Extrapolated Volition (CEV)",{ author: "wuschel", tags: ["AI_safety_advanced"] }],
    ["GPU", "GPT",{ author: "wuschel", tags: ["AI_safety_advanced"] }],
    ["Corrigibility", "Interpretability",{ author: "wuschel", tags: ["AI_safety_advanced"] }],
    ["Zoo","Aquarium",{ author: "Claude", tags: ["everyday", "place"] }],
    ["Beach","Swimming pool",{ author: "Claude", tags: ["everyday", "place"] }],
    ["Ski resort","Skate park",{ author: "Claude", tags: ["everyday", "place"] }],
    ["Church","Courthouse",{ author: "Claude", tags: ["everyday", "place"] }],
    ["Playground","Arcade",{ author: "Claude", tags: ["everyday", "place"] }],
    ["Bowling alley","Mini-golf course",{ author: "Claude", tags: ["everyday", "place"] }],
    ["Laundromat","Dry cleaner",{ author: "Claude", tags: ["everyday", "place"] }],
    ["Bakery","Ice cream parlor",{ author: "Claude", tags: ["everyday", "place"] }],
    ["Post office","Courier service",{ author: "Claude", tags: ["everyday", "place"] }],
    ["Bank","Casino",{ author: "Claude", tags: ["everyday", "place"] }],
    ["Pharmacy","Health food store",{ author: "Claude", tags: ["everyday", "place"] }],
    ["Pet store","Animal shelter",{ author: "Claude", tags: ["everyday", "place"] }],
    ["Amusement park","State fair",{ author: "Claude", tags: ["everyday", "place"] }],
    ["Nightclub","Comedy club",{ author: "Claude", tags: ["everyday", "place"] }],
    ["Tattoo parlor","Piercing studio",{ author: "Claude", tags: ["everyday", "place"] }],
    ["Yoga studio","Martial arts dojo",{ author: "Claude", tags: ["everyday", "place"] }],
    ["Antique shop","Thrift store",{ author: "Claude", tags: ["everyday", "place"] }],
    ["Car dealership","Bike shop",{ author: "Claude", tags: ["everyday", "place"] }],
    ["Florist","Garden center",{ author: "Claude", tags: ["everyday", "place"] }],
    ["Tailor","Costume shop",{ author: "Claude", tags: ["everyday", "place"] }],
    ["Furniture store","Flea market",{ author: "Claude", tags: ["everyday", "place"] }],
    ["Diner","Food truck",{ author: "Claude", tags: ["everyday", "place"] }],
    ["Daycare center","Senior center",{ author: "Claude", tags: ["everyday", "place"] }],
    ["Barber shop","Beauty salon",{ author: "Claude", tags: ["everyday", "place"] }],
    ["Bookstore","Comic book shop",{ author: "Claude", tags: ["everyday", "place"] }],
    ["Dentist office","Orthodontist office",{ author: "Claude", tags: ["everyday", "place"] }],
    ["Karaoke bar","Piano bar",{ author: "Claude", tags: ["everyday", "place"] }],
    ["Butcher shop","Vegan cafe",{ author: "Claude", tags: ["everyday", "place"] }],
    ["Winery","Brewery",{ author: "Claude", tags: ["everyday", "place"] }],
    ["Shoe store","Hat shop",{ author: "Claude", tags: ["everyday", "place"] }],
    ["Pawn shop","Auction house",{ author: "Claude", tags: ["everyday", "place"] }],
    ["Tanning salon","Spray tan booth",{ author: "Claude", tags: ["everyday", "place"] }],
    ["Optometrist","Eyeglass store",{ author: "Claude", tags: ["everyday", "place"] }],
    ["Record store","Music school",{ author: "Claude", tags: ["everyday", "place"] }],
    ["Travel agency","Luggage store",{ author: "Claude", tags: ["everyday", "place"] }],
    ["Fishing pier","Hunting lodge",{ author: "Claude", tags: ["everyday", "place"] }],
    ["Pottery studio","Glass blowing workshop",{ author: "Claude", tags: ["everyday", "place"] }],
    ["Escape room","Laser tag arena",{ author: "Claude", tags: ["everyday", "place"] }],
    ["Psychic reader","Fortune cookie factory",{ author: "Claude", tags: ["everyday", "place"] }],
    ["Driving range","Miniature golf course",{ author: "Claude", tags: ["everyday", "place"] }],
    ["Rock climbing gym","Bouldering cave",{ author: "Claude", tags: ["everyday", "place"] }],
    ["Trampoline park","Roller skating rink",{ author: "Claude", tags: ["everyday", "place"] }],
    ["The horizon","The sky",{ author: "Claude", tags: ["abstract"] }],
    ["The end of the universe","The event horizon",{ author: "Claude", tags: ["abstract"] }],
    ["The afterlife","The underworld",{ author: "Claude", tags: ["abstract"] }],
    ["The subconscious","The dreamscape",{ author: "Claude", tags: ["abstract"] }],
    ["The stratosphere","The ozone layer",{ author: "Claude", tags: ["abstract"] }],
    ["The eye of a storm","The calm before the storm",{ author: "Claude", tags: ["abstract"] }],
    ["The Bermuda Triangle","The Twilight Zone",{ author: "Claude", tags: ["abstract"] }],
    ["The center of the Earth","The core of the Sun",{ author: "Claude", tags: ["abstract"] }],
    ["The fourth dimension","The space-time continuum",{ author: "Claude", tags: ["abstract"] }],
    ["Times Square","Red Square",{ author: "Claude", tags: ["specific", "place"] }],
    ["Hollywood Sign","London Eye",{ author: "Claude", tags: ["specific", "place"] }],
    ["Central Park","Hyde Park",{ author: "Claude", tags: ["specific", "place"] }],
    ["Notre Dame Cathedral","Westminster Abbey",{ author: "Claude", tags: ["specific", "place"] }],
    ["Mount Rushmore","Sphinx",{ author: "Claude", tags: ["specific", "place"] }],
    ["Leaning Tower of Pisa","CN Tower",{ author: "Claude", tags: ["specific", "place"] }],
    ["Vatican City","Mecca",{ author: "Claude", tags: ["specific", "place"] }],
    ["Great Barrier Reef","Amazon Rainforest",{ author: "Claude", tags: ["specific", "place"] }],
    ["Venetian Canals","Panama Canal",{ author: "Claude", tags: ["specific", "place"] }],
    ["Alcatraz","Tower of London",{ author: "Claude", tags: ["specific", "place"] }],
    ["Grand Canyon","Niagara Falls",{ author: "Claude", tags: ["specific", "place"] }],
    ["Statue of Liberty","Christ the Redeemer",{ author: "Claude", tags: ["specific", "place"] }],
    ["Eiffel Tower","Tokyo Tower",{ author: "Claude", tags: ["specific", "place"] }],
    ["Pyramids of Giza","Stonehenge",{ author: "Claude", tags: ["specific", "place"] }],
    ["Colosseum","Acropolis",{ author: "Claude", tags: ["specific", "place"] }],
    ["Great Wall of China","Berlin Wall",{ author: "Claude", tags: ["specific", "place"] }],
    ["Mount Everest","Alps",{ author: "Claude", tags: ["specific", "place"] }],
    ["Taj Mahal","Kremlin",{ author: "Claude", tags: ["specific", "place"] }],
    ["Golden Gate Bridge","Brooklyn Bridge",{ author: "Claude", tags: ["specific", "place"] }],
    ["White House","Buckingham Palace",{ author: "Claude", tags: ["specific", "place"] }],
    ["Louvre Museum","Hermitage Museum",{ author: "Claude", tags: ["specific", "place"] }],
    ["Yellowstone National Park","Serengeti National Park",{ author: "Claude", tags: ["specific", "place"] }],
    ["Sagrada Familia","St. Peter's Basilica",{ author: "Claude", tags: ["specific", "place"] }],
    ["Machu Picchu","Chichen Itza",{ author: "Claude", tags: ["specific", "place"] }],
    ["Venice Canals","Amsterdam Canals",{ author: "Claude", tags: ["specific", "place"] }],
    ["Sistine Chapel","Hagia Sophia",{ author: "Claude", tags: ["specific", "place"] }],
    ["Galapagos Islands","Maldives",{ author: "Claude", tags: ["specific", "place"] }],
    ["Neuschwanstein Castle","Palace of Versailles",{ author: "Claude", tags: ["specific", "place"] }],
    ["Uluru (Ayers Rock)","Table Mountain",{ author: "Claude", tags: ["specific", "place"] }],
    ["Pompeii","Ephesus",{ author: "Claude", tags: ["specific", "place"] }],
    ["Security check (airport)","Border control (airport)",{ author: "Jonas", tags: ["everyday", "place"] }],
    ["Corner shop","Vending machine",{ author: "Jonas", tags: ["everyday", "place"] }],
    ["Gate (airport)","Platform (train station)",{ author: "Jonas", tags: ["everyday", "place"] }],
    ["Backpackers hostel","Mountain hut (for hikers)",{ author: "Jonas", tags: ["everyday", "place"] }],
    ["Dormitory","Youth hostel",{ author: "Jonas", tags: ["everyday", "place"] }],
    ["Ballroom","Drawing room",{ author: "Jonas", tags: ["everyday", "place"] }],
    ["Outhouse (de: Plumsklo)","Porta Potty (at construction sites, de: Dixi-Klo)",{ author: "Jonas", tags: ["everyday", "place", "german"] }],
    ["LinkedIn","Twitter",{ author: "Jonas", tags: ["everyday"] }],
    ["Fiancee","War bride",{ author: "Jonas", tags: ["everyday", "person"] }],
    ["9/11 memorial","One World Trade Center",{ author: "Jonas", tags: ["specific", "place"] }],
    ["Menstrual cramps","Labour pains",{ author: "Jonas", tags: ["everyday"] }],
    ["Music festival","Rave (dance party)",{ author: "Jonas", tags: ["everyday"] }],
    ["Hitchhiking","Hijacking",{ author: "Jonas", tags: ["everyday"] }],
    ["Remix","Medley",{ author: "Jonas", tags: ["everyday"] }],
    ["Brettspielmesse","Gamescom",{ author: "Eva", tags: ["everyday", "german"] }],
    ["Bauernhof","Streichelzoo",{ author: "Eva", tags: ["everyday", "place", "german"] }],
    ["Second Hand shop","Begehbarer Kleiderschrank",{ author: "Eva", tags: ["everyday", "place", "german"] }],
    ["Baumarkt","Hochseilgarten",{ author: "Eva", tags: ["everyday", "place", "german"] }],
    ["Flussbiegung","Deich",{ author: "Eva", tags: ["everyday", "place", "german"] }],
    ["Meeresboden","Raumschiff",{ author: "Eva", tags: ["abstract", "german"] }],
    ["Dungeon","Labyrinth",{ author: "Eva", tags: ["everyday", "place"] }],
    ["Streuobstwiese","Maisfeld",{ author: "Eva", tags: ["everyday", "place", "german"] }],
    ["Safari","Jungel",{ author: "Eva", tags: ["everyday", "place", "german"] }],
    ["Hochzeit","Jahrmarkt",{ author: "Eva", tags: ["everyday", "german"] }],
    ["Gefängnis","U-Boot",{ author: "Eva", tags: ["everyday", "place", "german"] }],
    ["Matratzenfachgeschäft","Buchladen",{ author: "Eva", tags: ["everyday", "place", "german"] }],
    ["Gärtnerei","Botanischer Garten",{ author: "Eva", tags: ["everyday", "place", "german"] }],
    ["Schmetterlingshaus","Greifvogelshow",{ author: "Eva", tags: ["everyday", "place", "german"] }],
    ["Wetterbalon","Heißluftballon",{ author: "Eva", tags: ["everyday", "german"] }],
    ["Mondlandschaft","Sahara",{ author: "Eva", tags: ["specific", "place", "german"] }],
    ["Mediamarkt","Spielsalon",{ author: "Eva", tags: ["everyday", "place", "german"] }],
    ["Gewächshaus","Orangerie",{ author: "Eva", tags: ["everyday", "place", "german"] }],
    ["Lichterkette","Kronleuchter",{ author: "Eva", tags: ["everyday", "german"] }],
    ["Bierzelt","Disco",{ author: "Eva", tags: ["everyday", "place", "german"] }],
];
  
  words.forEach(([word1, word2, meta]) => {
    addJaccuseWord(word1, word2, meta.author, meta.tags);
  });


export { loadJaccuseWords, addJaccuseWord };