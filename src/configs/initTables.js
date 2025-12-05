const pool = require("../services/db");

const SQLSTATEMENT = `
DROP TABLE IF EXISTS User;

DROP TABLE IF EXISTS Task;

DROP TABLE IF EXISTS TaskProgress;

DROP TABLE IF EXISTS Item;

DROP TABLE IF EXISTS ItemBought;

DROP TABLE IF EXISTS Creature;

DROP TABLE IF EXISTS CreatureBought;

DROP TABLE IF EXISTS Quest;

DROP TABLE IF EXISTS QuestProgress;

DROP TABLE IF EXISTS Rewards;

DROP TABLE IF EXISTS RewardGotten;

DROP TABLE IF EXISTS Messages;

CREATE TABLE User (
    user_id INT PRIMARY KEY AUTO_INCREMENT, 
    username TEXT,
    email TEXT,
    total_points INT DEFAULT 0,
    password TEXT NOT NULL,
    created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_login_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Task (
    task_id INT PRIMARY KEY AUTO_INCREMENT,
    title TEXT,
    description TEXT,
    points INT
);
   
CREATE TABLE TaskProgress (
    progress_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    task_id INT NOT NULL,
    completion_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    notes TEXT
);

CREATE TABLE Messages (
  id INT PRIMARY KEY AUTO_INCREMENT,
  message_text TEXT NOT NULL,
  user_id INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  username TEXT
);

CREATE TABLE Item (
  item_id INT PRIMARY KEY AUTO_INCREMENT,
  name TEXT,
  description TEXT,
  item_points INT 
);

CREATE TABLE ItemBought (
  itemBought_id INT PRIMARY KEY AUTO_INCREMENT,
  item_id INT NOT NULL,
  user_id INT NOT NULL,
  item_name TEXT,
  item_description TEXT
);

CREATE TABLE Creature (
  creature_id INT PRIMARY KEY AUTO_INCREMENT,
  name TEXT,
  description TEXT,
  creature_points INT 
);

CREATE TABLE CreatureBought (
  creatureBought_id INT PRIMARY KEY AUTO_INCREMENT,
  creature_id INT NOT NULL,
  user_id INT NOT NULL,
  feedCreature TIMESTAMP DEFAULT NULL,
  waterCreature TIMESTAMP DEFAULT NULL,
  creature_name TEXT,
  creature_description TEXT
);

CREATE TABLE Quest (
  quest_id INT PRIMARY KEY AUTO_INCREMENT,
  title TEXT,
  description TEXT,
  reward_id INT
);
 
CREATE TABLE QuestProgress (
  questProgress_id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  quest_id INT NOT NULL,
  completion_date TIMESTAMP
);

CREATE TABLE Rewards (
  reward_id INT PRIMARY KEY AUTO_INCREMENT,
  name TEXT,
  description TEXT
);

CREATE TABLE RewardGotten (
  rewardGotten_id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  reward_id INT NOT NULL,
  reward_name TEXT,
  reward_description TEXT
);

INSERT INTO task (task_id, title, description, points) VALUES
(1, 'Plant a Tree', 'Plant a tree in your neighbourhood or a designated green area.', 50),
(2, 'Use Public Transportation', 'Use public transportation or carpool instead of driving alone.', 30),
(3, 'Reduce Plastic Usage', 'Commit to using reusable bags and containers.', 40),
(4, 'Energy Conservation', 'Turn off lights and appliances when not in use.', 25),
(5, 'Composting', 'Start composting kitchen scraps to create natural fertilizer.', 35);

INSERT INTO item (item_id, name, description, item_points) VALUES
(1, 'Blossom bloomblade', 'A finely crafted sword adorned with enchanted blossoms.', 100),
(2, 'Evergreen potion', 'A potion brewed from the essence of ancient evergreen trees.', 120),
(3, 'Stormleaf pendant', 'A pendant adorned with leaves that harnesses the power of storms.', 150),
(4, 'Radiant rainforest ring', 'A ring adorned with a radiant gem from the heart of a mystical rainforest.', 180),
(5, 'Coral blossom', 'An unique flower bloomed from the enchanted coral reefs.', 230),
(6, 'Solaris seedling staff', 'A staff containing a seedling from the legendary Solaris Tree.', 200),
(7, 'Aquaflora potion', 'A potion made from rare aquatic plants.', 160),
(8, 'Windwhisper boots', 'Boots that enable the wearer to move swiftly and silently.', 140),
(9, 'Luminous leaf whisperer', 'A magical flute crafted from luminescent leaves.', 180),
(10, 'Thornshade tincture', 'A potion brewed from the essence of magical thorns.', 160);

INSERT INTO creature (creature_id, name, description, creature_points) VALUES
(1, 'Riversong Serpent', 'A serpentine creature that glides through water with grace, its scales emitting a calming melody.', 230),
(2, 'Blossomback Bear', 'A bear with fur that mimics the appearance of blooming flowers.', 200),
(3, 'Stormwhisker Panther', 'A sleek panther with fur that crackles with energy, harnessing the power of storms.', 260),
(4, 'Glimmerglide Jellyfish', 'A ring adorned with a radiant gem from the heart of a mystical rainforest.', 180),
(5, 'Coral blossom', 'Luminescent jellyfish that navigate the depths of the ocean.', 230),
(6, 'Verdant Vulpixie', 'A small, fox-like creature with a coat that changes hues with the seasons.', 180),
(7, 'Sylvan Sentinel Owl', 'Wise owls with leaf-like feathers.', 210),
(8, 'Mosswhisper Sprite', 'Tiny ethereal beings that flit through the air.', 150),
(9, 'Lunar Lotus Drake', 'A dragon with lotus-petal scales.', 250),
(10, 'Emberwing Phoenix', 'A fiery bird that leaves trails of embers in its wake.', 270);

INSERT INTO quest (quest_id, title, description) VALUES
(1, 'Water Conservation', 'Conserve water by fixing leaks and using water-efficient appliances.'),
(2, 'Volunteer for Cleanups', 'Participate in local community cleanups to keep the environment clean.'),
(3, 'Eco-Friendly Shopping', 'Choose products with minimal packaging and eco-friendly materials.'),
(4, 'Bike or Walk to Work', 'Opt for biking or walking to reduce carbon emissions from commuting.'),
(5, 'Educate Others', 'Spread awareness about environmental issues and sustainable practices.');

INSERT INTO rewards (reward_id, name, description) VALUES
(1, 'Nature Bounty', 'Receive a basket filled with enchanted fruits and herbs.'),
(2, 'Eco Explorer Map', 'Unlock a detailed map of unexplored natural wonders.'),
(3, 'Guardian Blessing', 'Gain the blessing of a mystical guardian.'),
(4, 'Harmony Pendant', 'Receive a pendant that radiates harmony.'),
(5, 'Elemental Attunement', 'Undergo a ritual to attune to one of the elemental forces (Earth, Water, Fire, or Air).'),
(6, 'Whispering Grove Retreat', 'Earn a stay at the peaceful Whispering Grove Retreat.'),
(7, 'Aetheric Artisan Workshop', 'Gain access to an artisan workshop infused with aetheric energy.'),
(8, 'Nature Harmony Elixir', 'Receive a vial of Nature Harmony Elixir.'),
(9, 'Sylvan Companion Egg', 'Obtain a mysterious egg containing the essence of a sylvan companion.'),
(10, 'Celestial Beacon', 'Acquire a Celestial Beacon, a magical light source that guides the way and repels dark forces in the surrounding area.');

`;

pool.query(SQLSTATEMENT, (error, results, fields) => {
  if (error) {
    console.error("Error creating tables:", error);
  } else {
    console.log("Tables created successfully");
  }
  process.exit();
});
