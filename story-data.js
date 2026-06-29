/* STORY DATA
   Writers can edit this file without changing the rendering engine.
*/
window.STORY_DATA = {
  meta: {
    title: "THE LAST CHECK-IN: EYES OF AL-YAMAMA",
    arabicTitle: "آخر تسجيل دخول: عيون اليمامة",
    guest: "Saqer",
    age: 18
  },

  chapters: [
    {
      id: "welcome",
      title: "Chapter 1: Welcome Back",
      objective: "Find why the resort knows your name.",
      map: [
        "111111111111",
        "100000000001",
        "101111011101",
        "100001000001",
        "101101110101",
        "100100010001",
        "101101011101",
        "100000010001",
        "101111010101",
        "100000000001",
        "111111111111"
      ],
      start: { x: 2.2, y: 8.5, angle: -1.25 },
      walls: "lobby",
      events: [
        { id: "receipt", x: 3.5, y: 8.5, label: "Check-in machine", type: "choice", choice: "receiptChoice" },
        { id: "phone", x: 8.5, y: 8.5, label: "Ringing phone", type: "choice", choice: "phoneChoice" },
        { id: "elevator", x: 9.5, y: 2.5, label: "Elevator", type: "cutscene", cutscene: "bellboyIntro", nextChapter: "cctv" }
      ],
      intro: "opening"
    },
    {
      id: "cctv",
      title: "Chapter 2: The Cameras With Blue Eyes",
      objective: "Restore CCTV power and decide whether to trust Zarqa's vision.",
      map: [
        "111111111111",
        "100000000001",
        "101111110101",
        "100000010101",
        "111110010101",
        "100010000001",
        "101010111101",
        "101000100001",
        "101111101101",
        "100000000001",
        "111111111111"
      ],
      start: { x: 2.0, y: 9.0, angle: -0.8 },
      walls: "security",
      events: [
        { id: "cctvdesk", x: 5.5, y: 5.5, label: "CCTV desk", type: "choice", choice: "visionChoice" },
        { id: "bluecamera", x: 9.5, y: 2.5, label: "Blue-eyed camera", type: "cutscene", cutscene: "zarqaFirstWhisper" },
        { id: "exit2", x: 10.3, y: 8.7, label: "Service door", type: "chapter", nextChapter: "rooms" }
      ],
      intro: "cctvIntro"
    },
    {
      id: "rooms",
      title: "Chapter 3: Rooms That Confess",
      objective: "Collect three guest records. Every room tells a crime.",
      map: [
        "111111111111",
        "100000000001",
        "101110111101",
        "101000100001",
        "101011101101",
        "100010000001",
        "101110111101",
        "100000100001",
        "101111101101",
        "100000000001",
        "111111111111"
      ],
      start: { x: 2.0, y: 9.0, angle: -0.7 },
      walls: "rooms",
      events: [
        { id: "room101", x: 2.5, y: 3.5, label: "Room 101", type: "choice", choice: "childShoeChoice" },
        { id: "room204", x: 5.5, y: 5.5, label: "Room 204 Contracts", type: "choice", choice: "contractOrderChoice" },
        { id: "room309", x: 9.5, y: 3.5, label: "Perfumed room", type: "choice", choice: "perfumeChoice" },
        { id: "exit3", x: 10.2, y: 8.6, label: "Red corridor access", type: "chapter", nextChapter: "wedding" }
      ],
      intro: "roomsIntro"
    },
    {
      id: "wedding",
      title: "Chapter 4: The Red Corridor",
      objective: "Cross the wedding floor without walking over the vow.",
      map: [
        "111111111111",
        "100000000001",
        "101111111101",
        "100000000001",
        "101011110101",
        "101000010101",
        "101110010101",
        "100010000001",
        "101011111101",
        "100000000001",
        "111111111111"
      ],
      start: { x: 2.0, y: 9.0, angle: -1.0 },
      walls: "wedding",
      events: [
        { id: "vow", x: 4.5, y: 7.5, label: "Vow warning", type: "choice", choice: "weddingShoeChoice" },
        { id: "bride", x: 8.5, y: 3.5, label: "Barefoot Bride", type: "cutscene", cutscene: "brideReveal" },
        { id: "exit4", x: 10.2, y: 1.5, label: "Old service elevator", type: "chapter", nextChapter: "survivor" }
      ],
      intro: "weddingIntro"
    },
    {
      id: "survivor",
      title: "Chapter 5: The Guest Who Became You",
      objective: "Decide whether the faceless survivor is human.",
      map: [
        "111111111111",
        "100000000001",
        "101101111101",
        "101100000001",
        "100001111101",
        "111101000001",
        "100001011101",
        "101111000001",
        "100000111101",
        "100000000001",
        "111111111111"
      ],
      start: { x: 2.0, y: 9.0, angle: -0.5 },
      walls: "service",
      events: [
        { id: "survivor", x: 6.5, y: 6.5, label: "Faceless survivor", type: "choice", choice: "survivorChoice" },
        { id: "shadow", x: 8.5, y: 3.5, label: "Late shadow", type: "cutscene", cutscene: "qareenAwakens" },
        { id: "exit5", x: 10.3, y: 1.7, label: "Basement stairs", type: "chapter", nextChapter: "bank" }
      ],
      intro: "survivorIntro"
    },
    {
      id: "bank",
      title: "Chapter 6: The Basement Bank",
      objective: "Withdraw the memory that reveals your father’s transaction.",
      map: [
        "111111111111",
        "100000000001",
        "101111011101",
        "100001010001",
        "111101010101",
        "100001000101",
        "101101111101",
        "101000000001",
        "101111110101",
        "100000000001",
        "111111111111"
      ],
      start: { x: 2.0, y: 9.0, angle: -0.75 },
      walls: "bank",
      events: [
        { id: "atm", x: 6.5, y: 5.5, label: "Memory ATM", type: "choice", choice: "atmPinChoice" },
        { id: "vault", x: 9.5, y: 2.5, label: "Rejected transaction", type: "cutscene", cutscene: "fatherTransaction" },
        { id: "exit6", x: 10.2, y: 8.7, label: "Room 000 access", type: "chapter", nextChapter: "father" }
      ],
      intro: "bankIntro"
    },
    {
      id: "father",
      title: "Chapter 7: Room 000",
      objective: "Face the father Saqer believed had abandoned him.",
      map: [
        "111111111111",
        "100000000001",
        "101111111101",
        "101000000101",
        "101011110101",
        "101010010101",
        "101010010101",
        "101000000101",
        "101111111101",
        "100000000001",
        "111111111111"
      ],
      start: { x: 2.0, y: 9.0, angle: -1.0 },
      walls: "home",
      events: [
        { id: "father", x: 6.0, y: 5.5, label: "Father", type: "choice", choice: "fatherChoice" },
        { id: "exit7", x: 10.1, y: 1.5, label: "Descent to Eye Tower", type: "chapter", nextChapter: "tower" }
      ],
      intro: "fatherIntro"
    },
    {
      id: "tower",
      title: "Final Chapter: The Eye Tower",
      objective: "Choose what, if anything, Saqer offers.",
      map: [
        "111111111111",
        "100000000001",
        "100111111001",
        "101000000101",
        "101011110101",
        "101010010101",
        "101011110101",
        "101000000101",
        "100111111001",
        "100000000001",
        "111111111111"
      ],
      start: { x: 2.0, y: 9.0, angle: -1.0 },
      walls: "tower",
      events: [
        { id: "zarqa", x: 6.0, y: 5.2, label: "Zarqa's eyeless chair", type: "cutscene", cutscene: "towerReveal" },
        { id: "final", x: 6.0, y: 3.5, label: "Ledger Well", type: "choice", choice: "finalChoice" }
      ],
      intro: "towerIntro"
    }
  ],

  cutscenes: {
    opening: [
      { speaker: "SYSTEM", text: "The message arrives after midnight.\n\nNo number. No sender.\n\nOnly a hotel receipt on your phone screen." },
      { speaker: "RECEIPT", text: "Guest Name: Saqer\nAge: 18\nRoom: 000\nGuardian: Not Required\nBalance: One Unwritten Future\nCollection Status: Active" },
      { speaker: "HOTEL SPEAKER", text: "Congratulations, Mr. Saqer.\nYou are now old enough to pay." }
    ],
    bellboyIntro: [
      { speaker: "ELEVATOR", text: "The elevator opens by itself.\n\nInside stands a bellboy wearing a cracked golden mask. His luggage whispers with many voices." },
      { speaker: "THE BELLBOY", text: "Welcome back, sir.\nWe kept your room." },
      { speaker: "HOTEL RECORD", text: "First collector encounter recorded.\nProceed to CCTV control." }
    ],
    cctvIntro: [
      { speaker: "SECURITY OFFICE", text: "Dust covers the monitors. The power switch is already warm, as if someone used it seconds ago." },
      { speaker: "SYSTEM", text: "When the screens wake, every camera shows you.\nOne angle from above.\nOne from behind.\nOne from five minutes in the future." }
    ],
    zarqaFirstWhisper: [
      { speaker: "ZARQA", text: "I saw armies before they arrived.\nI saw cities before they burned.\nBut you...\nYou are empty." },
      { speaker: "SYSTEM", text: "The camera lens turns blue.\nIt is not recording you.\nIt is looking at you." }
    ],
    roomsIntro: [
      { speaker: "HOTEL RECORD", text: "Guest rooms unlocked.\nEach room has confessed before.\nEach room will confess again." },
      { speaker: "THE BELLBOY", text: "Please do not disturb the memories, sir.\nSome of them still bite." }
    ],
    weddingIntro: [
      { speaker: "RED CORRIDOR", text: "The carpet is covered with dried flower petals.\nA line of Arabic writing moves slowly across the wall." },
      { speaker: "WARNING", text: "لا تمش فوق العهد بحذائك\nDo not walk over the vow with your shoes." }
    ],
    brideReveal: [
      { speaker: "THE BAREFOOT BRIDE", text: "Your father also begged for the dead to return.\nBut he begged for you." },
      { speaker: "SAQER", text: "What did he give you?" },
      { speaker: "THE BAREFOOT BRIDE", text: "Everything he could remember." }
    ],
    survivorIntro: [
      { speaker: "SERVICE TUNNELS", text: "The employee corridors are narrower than they should be.\nThe walls are scratched with rules written by someone who survived too long." },
      { speaker: "WALL SCRATCHES", text: "If it calls your name, do not answer.\nIf the elevator asks for your floor, lie.\nIf your shadow smiles, stop moving." }
    ],
    qareenAwakens: [
      { speaker: "SYSTEM", text: "Your shadow moves one second late." },
      { speaker: "AL-MUDAWWIN", text: "Guest has demonstrated ownership of violence.\nShadow witness created." }
    ],
    bankIntro: [
      { speaker: "BASEMENT BANK", text: "The basement looks like a private banking hall.\nBut the machines do not dispense cash.\nThey dispense memories." },
      { speaker: "ATM RECEIPT", text: "Withdrawal: Mother’s voice\nDeposit: Childhood fear\nTransfer: Brother’s name\nBalance Remaining: 3 years" }
    ],
    fatherTransaction: [
      { speaker: "MEMORY ATM", text: "Deposit: My life\nWithdrawal: My son’s freedom\nStatus: Rejected\nReason: Son has no visible future" },
      { speaker: "AL-MUDAWWIN", text: "A future that cannot be seen cannot be priced.\nA price that cannot be paid must be collected." }
    ],
    fatherIntro: [
      { speaker: "ROOM 000", text: "Room 000 is not a hotel room.\nIt is your childhood home, rebuilt from someone else's dying memory." },
      { speaker: "FATHER", text: "Every year, I gave it one memory of you.\nYour first word.\nYour first step.\nYour face at seven.\nYour voice at twelve." },
      { speaker: "FATHER", text: "I gave everything I had of you, so it would not find you." },
      { speaker: "FATHER", text: "Are you my son?" }
    ],
    towerIntro: [
      { speaker: "EYE TOWER", text: "The tower is buried upside down.\nYou do not climb toward sight.\nYou descend into the place where sight was stolen." },
      { speaker: "SYSTEM", text: "CCTV cables become black roots.\nReceipts hang like dead leaves.\nHundreds of lenses open in the dark." }
    ],
    towerReveal: [
      { speaker: "ZARQA", text: "I saw every guest before they died.\nI saw every betrayal before it was spoken.\nBut when I looked at you, there was nothing." },
      { speaker: "AL-MUDAWWIN", text: "A man without a written future is theft from reality.\nYou are the missing number.\nYou are the unpaid line.\nYou are the error." }
    ]
  },

  choices: {
    receiptChoice: {
      title: "The Check-In Receipt",
      text: "The machine waits for your signature. The ink smells like rain on hot stone.",
      options: [
        {
          text: "Sign the receipt.",
          result: "The lobby opens easily. Something now knows how to say your name.",
          effects: { debt: 2, survival: -1, signedReceipt: true },
          after: "The pen moves before your hand does."
        },
        {
          text: "Refuse to sign.",
          result: "The doors resist. The hotel has less authority over you.",
          effects: { survival: 1, debt: -1 },
          after: "The receipt prints: REFUSAL RECORDED."
        },
        {
          text: "Tear the receipt.",
          result: "The Bellboy will arrive earlier, but a hidden route opens.",
          effects: { survival: 1, violence: 1, bellboyHeat: 1 },
          after: "From the elevator, three polite knocks answer you."
        },
        {
          text: "Burn the receipt.",
          result: "Al-Mudawwin marks you as non-compliant. The Survival Way becomes stronger.",
          effects: { survival: 2, debt: -1, bellboyHeat: 1, burnedReceipt: true },
          after: "The ash forms one word: OVERDUE."
        }
      ]
    },

    phoneChoice: {
      title: "The First Phone Call",
      text: "The lobby phone rings. Your father's voice leaks from the receiver before you touch it.",
      options: [
        {
          text: "Answer the phone.",
          result: "You gain a clue, but the hotel learns you still need your father.",
          effects: { debt: 1, vision: 1, fatherWeaknessKnown: true },
          after: "The voice says: Son... Room 000. Come quickly."
        },
        {
          text: "Ignore it.",
          result: "The hotel cannot mimic your father yet.",
          effects: { survival: 1 },
          after: "The ringing continues after you walk away."
        },
        {
          text: "Smash the phone with your shoe.",
          result: "Useful, but violent. The Qareen notices.",
          effects: { violence: 1, qareen: 1, bellboyHeat: 1 },
          after: "Your shoe comes back warm."
        },
        {
          text: "Follow the phone cable.",
          result: "You discover the call is coming from below, not Room 000.",
          effects: { survival: 1, curiosity: 1 },
          after: "The cable disappears into the floor like a vein."
        }
      ]
    },

    visionChoice: {
      title: "Zarqa's Vision",
      text: "A CCTV monitor shows you being dragged into Room 414 in exactly sixty seconds.",
      options: [
        {
          text: "Follow the vision exactly.",
          result: "You avoid the immediate danger, but the future tightens around you.",
          effects: { vision: 2, debt: 1 },
          after: "The monitor prints: COMPLIANCE IMPROVES PREDICTION."
        },
        {
          text: "Do the opposite.",
          result: "The hotel becomes confused, but Zarqa trusts you less.",
          effects: { survival: 1, vision: -1, bellboyHeat: 1 },
          after: "For one second, every camera loses you."
        },
        {
          text: "Study the vision and change one detail.",
          result: "You learn to bend fate without obeying it.",
          effects: { survival: 2, vision: 1, knowsFateBending: true },
          after: "Zarqa whispers: Good. Do not worship what you see."
        },
        {
          text: "Destroy the camera.",
          result: "Zarqa goes silent. The Bellboy hears the glass.",
          effects: { violence: 1, vision: -2, bellboyHeat: 1 },
          after: "Blue light leaks from the broken lens like tears."
        }
      ]
    },

    childShoeChoice: {
      title: "Room 101: The Missing Child's Shoe",
      text: "A child asks for her missing shoe. The room smells of dust, toys, and old applause.",
      options: [
        {
          text: "Keep the shoe.",
          result: "You gain a strong distraction item, but crying follows you.",
          effects: { vision: 1, childShoeKept: true },
          after: "The small shoe fits in your hand like a heartbeat."
        },
        {
          text: "Throw it down the hallway.",
          result: "It distracts spirits, but the child remembers your cruelty.",
          effects: { violence: 1, qareen: 1 },
          after: "The crying moves from the room to behind you."
        },
        {
          text: "Return it to the child.",
          result: "A hidden safe route opens later. Sacrifice path improves.",
          effects: { sacrifice: 2, survival: 1, childShoeReturned: true },
          after: "The child says: I can walk home now."
        },
        {
          text: "Use it to bait the Bellboy.",
          result: "Effective, but cruel. The Qareen grows.",
          effects: { violence: 2, qareen: 2, bellboyHeat: -1 },
          after: "The Bellboy collects the shoe as if collecting a person."
        }
      ]
    },

    contractOrderChoice: {
      title: "Room 204: Contracts",
      text: "Contracts cover the walls. One man's success erased his brother from memory.",
      options: [
        {
          text: "Read the contracts slowly in order.",
          result: "You understand the crime and leave without feeding the hotel.",
          effects: { survival: 1, curiosity: 1 },
          after: "A forgotten brother's name appears on the door, then fades."
        },
        {
          text: "Tear the contracts away.",
          result: "The room bleeds ink. Violence increases.",
          effects: { violence: 1, qareen: 1 },
          after: "Ink crawls under your fingernails."
        },
        {
          text: "Sign one contract to open the door.",
          result: "The exit opens immediately. Debt increases sharply.",
          effects: { debt: 2, signedContract: true },
          after: "The signature is not yours, but the hotel accepts it."
        },
        {
          text: "Leave without reading.",
          result: "You survive faster but lose context needed for the true ending.",
          effects: { survival: 1, curiosity: -1 },
          after: "Behind you, the room whispers: Coward."
        }
      ]
    },

    perfumeChoice: {
      title: "Room 309: Perfume and Music",
      text: "A beautiful song moves through the room. The scent is expensive, sweet, and wrong.",
      options: [
        {
          text: "Follow the perfume.",
          result: "Umm Al-Duwais marks you. Beauty becomes dangerous.",
          effects: { debt: 1, vision: 1, bellboyHeat: 1 },
          after: "The mirror smiles before you do."
        },
        {
          text: "Hold your breath and move sideways.",
          result: "You pass without surrendering attention.",
          effects: { survival: 1 },
          after: "The song misses you by one step."
        },
        {
          text: "Throw a shoe toward the song.",
          result: "You break the lure, but risk losing part of your path.",
          effects: { survival: 1, hasOriginalShoe: -1 },
          after: "The shoe lands where the singer should have been."
        },
        {
          text: "Attack the mirror.",
          result: "The room stops singing. Your Qareen learns another habit.",
          effects: { violence: 1, qareen: 1 },
          after: "The broken mirror reflects someone still holding the weapon."
        }
      ]
    },

    weddingShoeChoice: {
      title: "The Red Corridor",
      text: "The warning says not to walk over the vow with your shoes.",
      options: [
        {
          text: "Keep your shoes on and run.",
          result: "The Barefoot Bride attacks. The hotel records panic.",
          effects: { bellboyHeat: 2, debt: 1, survival: -1 },
          after: "Every petal turns toward your footsteps."
        },
        {
          text: "Remove your shoes and walk slowly.",
          result: "Best survival route. You are quiet, but the floor reads your fear.",
          effects: { survival: 2, barefootMastery: true },
          after: "The floor feels cold, like memory."
        },
        {
          text: "Throw one shoe ahead to test the floor.",
          result: "You detect cursed tiles, but your original shoe may not return.",
          effects: { survival: 1, hasOriginalShoe: -1 },
          after: "The shoe stops before a tile that breathes."
        },
        {
          text: "Run barefoot.",
          result: "Silent panic. The corridor becomes longer.",
          effects: { vision: 1, bellboyHeat: 1 },
          after: "You run for twenty seconds and pass the same flower twice."
        }
      ]
    },

    survivorChoice: {
      title: "The Faceless Survivor",
      text: "A faceless man says he knows the exit. He never steps into light.",
      options: [
        {
          text: "Follow him immediately.",
          result: "Al-Ghoul may be wearing his voice. Debt and danger increase.",
          effects: { debt: 1, bellboyHeat: 1 },
          after: "His footsteps continue after he stops walking."
        },
        {
          text: "Attack him.",
          result: "You may kill the real survivor. The Qareen grows heavily.",
          effects: { violence: 2, qareen: 2 },
          after: "Your shadow claps once."
        },
        {
          text: "Question him first.",
          result: "You gain rules but the Bellboy gets closer.",
          effects: { survival: 1, curiosity: 1, bellboyHeat: 1 },
          after: "He says: The hotel cannot own what it cannot identify."
        },
        {
          text: "Watch his shadow.",
          result: "You identify the trick and keep control.",
          effects: { survival: 2, knowsShadowRule: true },
          after: "His shadow faces you while his body faces away."
        }
      ]
    },

    atmPinChoice: {
      title: "Memory ATM",
      text: "The ATM asks: ENTER THE YEAR YOU STOPPED BELIEVING HIM.",
      options: [
        {
          text: "Enter 2008.",
          result: "Correct. Saqer sees the father’s rejected transaction.",
          effects: { survival: 1, curiosity: 2, knowsFatherTruth: true },
          after: "The machine prints a memory instead of money."
        },
        {
          text: "Enter 2018.",
          result: "Wrong. The machine withdraws a childhood sound.",
          effects: { debt: 1, vision: 1 },
          after: "You forget the sound of your own laugh for ten seconds."
        },
        {
          text: "Kick the ATM.",
          result: "It works like a weapon, but the basement bank records violence.",
          effects: { violence: 1, qareen: 1 },
          after: "The ATM prints: AGGRESSION ACCEPTED AS SIGNATURE."
        },
        {
          text: "Walk away.",
          result: "You avoid the machine but lose a major truth.",
          effects: { survival: 1, curiosity: -2 },
          after: "The ATM whispers: Unclaimed memories accrue interest."
        }
      ]
    },

    fatherChoice: {
      title: "Room 000: The Father",
      text: "Al-Mudawwin offers a contract: Return the father. Submit the son.",
      options: [
        {
          text: "Sign to save your father.",
          result: "He returns physically, but the hotel owns your future.",
          effects: { debt: 4, signedFatherContract: true },
          after: "Your father opens his eyes and does not know your name."
        },
        {
          text: "Kill the corrupted body.",
          result: "You reject the contract through violence. The Qareen nearly completes.",
          effects: { violence: 3, qareen: 3 },
          after: "Your shadow keeps swinging after you stop."
        },
        {
          text: "Leave him and refuse the contract.",
          result: "Survival Way opens, but Saqer carries the guilt.",
          effects: { survival: 3, fatherLeft: true, debt: -1 },
          after: "Your father says: If you sign, all my suffering becomes meaningless."
        },
        {
          text: "Promise to break the ledger.",
          result: "Sacrifice path opens. True ending becomes possible if you keep restraint.",
          effects: { sacrifice: 2, survival: 1, promisedLedgerBreak: true },
          after: "For the first time, Room 000 forgets one wall."
        }
      ]
    },

    finalChoice: {
      title: "The Ledger Well",
      text: "Al-Mudawwin asks: What do you offer?",
      options: [
        {
          text: "Sign the final contract.",
          result: "Debt Ending.",
          effects: { debt: 5, finalSign: true },
          ending: true
        },
        {
          text: "Give your eyes to Zarqa.",
          result: "Eye Ending if sacrifice and vision are strong enough.",
          effects: { sacrifice: 3, vision: 2, gaveEyes: true },
          ending: true
        },
        {
          text: "Offer nothing.",
          result: "True Ending if you reached the well with restraint.",
          effects: { offeredNothing: true },
          ending: true
        },
        {
          text: "Run for the maintenance exit.",
          result: "Survival Ending if the hotel has weak authority over you.",
          effects: { attemptedSurvivalExit: true },
          ending: true
        }
      ]
    }
  },

  endings: {
    true: {
      title: "TRUE ENDING: THE UNWRITTEN MAN",
      text: "Saqer places his last shoe at the mouth of the Ledger Well.\n\n“My life is not a debt.\nMy father’s love was never a transaction.\nMy path is not yours to record.”\n\nAl-Mudawwin cannot calculate refusal without price. The contracts burn. Zarqa remembers her own name. Thousands of footsteps leave the resort.\n\nCHECK-OUT COMPLETE\nNO BALANCE REMAINING"
    },
    survival: {
      title: "SURVIVAL ENDING: THE ONE WHO LEFT",
      text: "Saqer escapes through the old maintenance tunnel before sunrise.\n\nBehind him, his father calls his name. The player does not turn back.\n\nThe resort disappears into the desert heat. Only one shoe remains in the sand.\n\nInside it is a receipt:\nGUEST ESCAPED\nBALANCE UNRESOLVED\nFUTURE UNREADABLE"
    },
    debt: {
      title: "DEBT ENDING: BALANCE TRANSFERRED",
      text: "Saqer signs. The hotel opens every door.\n\nHis father returns, but without memory. Outside, he looks at Saqer as a stranger.\n\nA final receipt prints in Saqer's pocket:\nBALANCE TRANSFERRED TO NEXT BLOODLINE"
    },
    qareen: {
      title: "QAREEN ENDING: HOUSEKEEPING",
      text: "Saqer survives by becoming the strongest thing in the hotel.\n\nAt sunrise, his shadow remains behind. It puts on the Bellboy's mask and knocks politely on the next guest's door.\n\nKnock. Knock. Knock.\n\n“Housekeeping.”"
    },
    eye: {
      title: "EYE ENDING: ZARQA SEES AGAIN",
      text: "Saqer gives his eyes to Zarqa.\n\nThe cameras bleed blue light. The guests are released. Saqer walks into the desert blind.\n\nA woman whispers from his shadow:\n“Do not fear the dark. I will see for you.”"
    },
    trapped: {
      title: "BAD ENDING: CHECK-IN COMPLETE",
      text: "Saqer hesitates too long. The hotel finds a price he is willing to pay.\n\nThe Bellboy closes the ledger.\n\nCHECK-IN COMPLETE\nCHECK-OUT NOT PERMITTED"
    }
  }
};
