export type Book = {
  title: string;
  image: string;
  headline: string;
  tags: string;
  createdAt: string;
};

const BOOK_LIBRARY: Book[] = [
  {
    title: "10x Engineering",
    image: "10x-engineer.jpg",
    headline: "Money, fame, maintainable code",
    tags: "software development, productivity, code quality, engineering excellence",
    createdAt: "2023-08-08T12:00:00.000Z",
  },
  {
    title: "Agile Project Micromanagement",
    image: "agile-micromanagement.png",
    headline: 'Cognitive Dissonance as "Process" | Water-Fall with Stand-ups',
    tags: "agile, project management, micromanagement, software development process",
    createdAt: "2023-08-08T12:00:00.000Z",
  },
  {
    title: "Anchor",
    image: "anchor.jpg",
    headline: "Eating glass on Solana painlessly",
    tags: "Solana, Rust, blockchain, cryptocurrency, development",
    createdAt: "2024-02-04T13:00:00.000Z",
  },
  {
    title: "Arbitrary Forecasts",
    image: "arbitrary-forecasts.jpg",
    headline: "Saying something so people feel better about giving you money",
    tags: "forecasting, business, finance, predictions",
    createdAt: "2023-08-08T12:00:00.000Z",
  },
  {
    title: "Getting an Arduino LED to Blink",
    image: "arduino-led-to-blink.jpg",
    headline:
      "Looks like it's back to pixels for you! | And Then Losing Interest",
    tags: "Arduino, LED, electronics, hobbyists, programming",
    createdAt: "2023-08-08T12:00:00.000Z",
  },
  {
    title: "Avoid Using Dark Patterns",
    image: "avoid-using-dark-patterns.jpg",
    headline: "Do. Or do not. There is no try.",
    tags: "clean code, ethics, user experience, design principles",
    createdAt: "2023-08-08T12:00:00.000Z",
  },
  {
    title: "Avoiding Data Structures",
    image: "avoiding-data-structures.jpg",
    headline: "Just use HashMaps! | For Minecraft Modders",
    tags: "data structures, algorithms, programming, Minecraft, java",
    createdAt: "2024-01-27T12:00:00.000Z",
  },
  {
    title: "Blaming the Architecture",
    image: "blaming-architecture.jpeg",
    headline: "Fundamentals of establishing a scapegoat",
    tags: "architecture, software design, blame culture, development",
    createdAt: "2023-08-08T12:00:00.000Z",
  },
  {
    title: "Blaming the User",
    image: "blaming-the-user.jpg",
    headline: "You're a 10x hacker and it must be someone else's fault.",
    tags: "user experience, blame, software development, 10x engineer",
    createdAt: "2023-08-08T12:00:00.000Z",
  },
  {
    title: "Bloated JabbaScript Frameworks",
    image: "bloated-jabbascript.jpg",
    headline:
      "Han ma boo-kee, keelee ka-lya dooka. Wadja da boolya ra 1.9 Megabytes",
    tags: "JavaScript, web development, frameworks, performance",
    createdAt: "2023-08-08T12:00:00.000Z",
  },
  {
    title: "Bracket Placement",
    image: "bracket-placement.png",
    headline: "From Friend To Enemy In Just One Day",
    tags: "coding style, syntax, programming, development",
    createdAt: "2023-08-08T12:00:00.000Z",
  },
  {
    title: "Breaking the Back Button",
    image: "breaking-back-button.jpg",
    headline: "Ruining something the browser gave you for free",
    tags: "web development, user experience, browser compatibility",
    createdAt: "2023-08-08T12:00:00.000Z",
  },
  {
    title: "Breaking important stuff on Friday",
    image: "breaking-important-stuff-on-friday.jpg",
    headline:
      "When the clock hits five, that's your problem now | Just let the intern fix it",
    tags: "Friday, deployment, software development, risk management",
    createdAt: "2024-01-27T12:00:00.000Z",
  },
  {
    title: "Resolving Broken Dependencies",
    image: "broken-dependencies.jpg",
    headline: "What did I do to deserve this?",
    tags: "dependencies, software development, troubleshooting, package management",
    createdAt: "2023-08-08T12:00:00.000Z",
  },
  {
    title: "Building AI with HTML",
    image: "building-ai-with-html.jpg",
    headline: "HyperText Machine Icarning",
    tags: "AI, HTML, machine learning, web development",
    createdAt: "2023-08-08T12:00:00.000Z",
  },
  {
    title: "Buzzword-first Design",
    image: "buzzword-first-design.jpg",
    headline: "Fashion-forward development",
    tags: "design, development, trends, buzzwords",
    createdAt: "2023-08-08T12:00:00.000Z",
  },
  {
    title: "Casual Sexism",
    image: "casual-sexism.jpg",
    headline:
      "Ensuring half the potential talent force feels uncomfortable and alienated",
    tags: "sexism, workplace culture, diversity, inclusion",
    createdAt: "2023-08-08T12:00:00.000Z",
  },
  {
    title: "Changing Sfugg and Seeing What Happens",
    image: "changing-stuff-and-seeing.jpg",
    headline: "How to actually learn any new programming concept",
    tags: "learning, programming, experimentation, development",
    createdAt: "2023-08-08T12:00:00.000Z",
  },
  {
    title: "Choosing Based on GitHub Stars",
    image: "choosing-based-on-github.jpg",
    headline: "Depending on a vague popularity contest",
    tags: "GitHub, open source, popularity, decision making",
    createdAt: "2023-08-08T12:00:00.000Z",
  },
  {
    title: "Useless Code Quality Metrics",
    image: "code-quality.jpeg",
    headline: "Blindly adhering to arbitrary standards",
    tags: "code quality, metrics, standards, software development",
    createdAt: "2023-08-08T12:00:00.000Z",
  },
  {
    title: "Coding Drunk",
    image: "coding-drunk.jpg",
    headline: "Thinking Outside The Bottle | Make Programming Fun Again",
    tags: "coding, creativity, programming, fun",
    createdAt: "2023-08-08T12:00:00.000Z",
  },
  {
    title: "Coding on the Weekend",
    image: "coding-on-weekend.jpg",
    headline:
      "a frustrating hobby | it's like weekday coding, but pants are optional",
    tags: "coding, hobby, weekend, programming",
    createdAt: "2023-08-08T12:00:00.000Z",
  },
  {
    title: "Turning Coffee Into Code",
    image: "coffee-into-code.jpg",
    headline:
      "It would be a pure function if not for the side effects on your sanity",
    tags: "programming, coffee, development, productivity",
    createdAt: "2023-08-08T12:00:00.000Z",
  },
  {
    title: "Collective Intelligence",
    image: "collective-intelligence.jpg",
    headline: "Building Smart Web 2.0 Applications",
    tags: "intelligence, collaboration, teamwork, data science",
    createdAt: "2023-08-08T12:00:00.000Z",
  },
  {
    title: "Compile Again and Pray to Work",
    image: "compile-and-pray.jpeg",
    headline: "Because something may change",
    tags: "compiling, programming, development, debugging",
    createdAt: "2023-08-08T12:00:00.000Z",
  },
  {
    title: "JPEG compression",
    image: "compression.jpeg",
    headline: "jpeg",
    tags: "JPEG, compression, image processing, optimization",
    createdAt: "2023-08-08T12:00:00.000Z",
  },
  {
    title:
      "Using Convoluted Coding Practices to Piece Together a Somehow Functional Product",
    image: "convoluted-coding-practices.jpg",
    headline:
      "Gain expertise using phrases similar to \"If it ain't broke, don't fix it\"",
    tags: "coding practices, software development, complexity",
    createdAt: "2023-08-08T12:00:00.000Z",
  },
  {
    title: "Cookie Consent and Other Ways to Obstruct the Web Page",
    image: "cookie-consent.png",
    headline: "Because the Web isn't unusable enough yet",
    tags: "web development, cookies, user experience, compliance",
    createdAt: "2023-08-08T12:00:00.000Z",
  },
  {
    title: "Copying and Pasting from Stack Overflow",
    image: "copying-and-pasting.jpg",
    headline: "Cutting corners to meet arbitrary management deadlines",
    tags: "Stack Overflow, development, shortcuts, deadlines, chatgpt, chat gpt",
    createdAt: "2023-08-08T12:00:00.000Z",
  },
  {
    title: "Copying snippets from pages made in 2003",
    image: "copying-snippets-from-pages-made-in-2003.jpg",
    headline: "No, no. That's not what I want.",
    tags: "Overflow, development",
    createdAt: "2024-01-27T12:00:00.000Z",
  },
  {
    title: "C++ profiling on Linux",
    image: "cpp-profiling-on-linux.jpg",
    headline: "Powered by Rolex | Bring your watch, mate",
    tags: "C++, Linux, profiling, performance, optimization",
    createdAt: "2024-01-27T12:00:00.000Z",
  },
  {
    title: "My Code is Cross-Browser Compatible",
    image: "cross-browser-code.png",
    headline:
      "and other lies you tell yourself | designing large-scale web sites",
    tags: "cross-browser, web development, compatibility, design",
    createdAt: "2023-08-08T12:00:00.000Z",
  },
  {
    title: "CTR+C CTR+V",
    image: "ctr-c-ctr-v.jpg",
    headline: "Licensing Guide",
    tags: "copy, paste, licensing, github, open source",
    createdAt: "2024-01-27T12:00:00.000Z",
  },
  {
    title: "Whatever Dan Abramov says to do",
    image: "dan-abramov-says.jpeg",
    headline: "Pure, functional, predictable, time travelling, handsome",
    tags: "Dan Abramov, functional programming, React, JavaScript, tutorial",
    createdAt: "2023-08-08T12:00:00.000Z",
  },
  {
    title: "Deleting a dropped project",
    image: "deleting-a-dropped-project.jpg",
    headline: "As clients minds change, so does your self esteem",
    tags: "project management, development",
    createdAt: "2024-01-27T12:00:00.000Z",
  },
  {
    title: "Deleting Code",
    image: "deleting-code.jpg",
    headline:
      "Oh how good it feels | Probably the most satisfying part of your job. Is that sad?",
    tags: "code deletion, refactoring, programming, satisfaction",
    createdAt: "2023-08-08T12:00:00.000Z",
  },
  {
    title: "Demon Extraction",
    image: "demon-extraction.jpg",
    headline: "A Guide To Removing Unwanted Evil Spirits",
    tags: "daemon, debugging, troubleshooting, software maintenance",
    createdAt: "2023-08-08T12:00:00.000Z",
  },
  {
    title: "Destructive Git Commands",
    image: "destructive-git-commands.jpg",
    headline: "WTF just happened? | I hope you backed up your code",
    tags: "Git, version control, commands, mistakes",
    createdAt: "2023-08-08T12:00:00.000Z",
  },
  {
    title: "Developing in Production",
    image: "develop-in-prod.jpeg",
    headline: "The fastest time to market",
    tags: "production, development, deployment, risk management",
    createdAt: "2023-08-08T12:00:00.000Z",
  },
  {
    title: "Drinking with Ansible",
    image: "drinking-with-ansible.jpg",
    headline: "Running playbook again and again | Drunk from kvas",
    tags: "patience, automation, devops",
    createdAt: "2024-02-04T13:00:00.000Z",
  },
  {
    title: "Drop Table",
    image: "drop-table.jpg",
    headline: "Now with user-generated content!",
    tags: "SQL, database, user-generated content, data management",
    createdAt: "2023-08-08T12:00:00.000Z",
  },
  {
    title: "Endless Boilerplate",
    image: "endless-boilerplate.jpg",
    headline: "Hello, ridiculously complicated world",
    tags: "boilerplate, code complexity, development, programming",
    createdAt: "2023-08-08T12:00:00.000Z",
  },
  {
    title: "Everything is a Fscking DNS Problem",
    image: "everything-is-a-fscking-dns-problem.jpg",
    headline: "Editing /etc/hosts for a living",
    tags: "DNS, networking, troubleshooting, sysadmin",
    createdAt: "2023-08-08T12:00:00.000Z",
  },
  {
    title: "Excuses for Now Writing Documentation",
    image: "excuses-for-no-documentation.jpg",
    headline:
      "Where's the fun in just knowing what the code is supposed to do?",
    tags: "documentation, excuses, development, communication",
    createdAt: "2023-08-08T12:00:00.000Z",
  },
  {
    title: "Exiting Vim",
    image: "exiting-vim.jpg",
    headline:
      "Just memorize these fourteen contextually dependent instructions",
    tags: "Vim, text editor, commands, complexity",
    createdAt: "2023-08-08T12:00:00.000Z",
  },
  {
    title: "Explaining Monads to people who don't care",
    image: "explaining-monads-to-people-who-dont-care.jpg",
    headline:
      "A dogmatic approach to nonexistent problems | Monad is just a monoid in the category of endofunctors. What's the problem?",
    tags: "monads, functional programming, Haskell, category theory",
    createdAt: "2023-08-08T12:00:00.000Z",
  },
  {
    title: "Exploiting Goodwill to advance your agenda",
    image: "exploiting-goodwill.png",
    headline: "why deny equal opportunity for all to contribute?",
    tags: "luck, exploitation, opportunity, collaboration",
    createdAt: "2023-08-08T12:00:00.000Z",
  },
  {
    title: "Fake news generation",
    image: "fake-news-generation.jpg",
    headline: "Putting NLP to good use",
    tags: "NLP, GPT, chatgpt, fake news, generation, datascience",
    createdAt: "2024-01-27T13:00:00.000Z",
  },
  {
    title: "Throwing Faster Hardware At The Problem",
    image: "faster-hardware.jpg",
    headline:
      "Speeding up your software without needing to actually optimize your code",
    tags: "cpu gpu ram memory, hardware, optimization, performance, technology",
    createdAt: "2023-08-08T12:00:00.000Z",
  },
  {
    title: "Fear of Missing Out",
    image: "fear-of-missing-out.jpg",
    headline:
      "If you're not running distributed Rust, Go, Elixir and Scala microservices with an elm front end, Apache Storm stream processing, and integrating with Facebook Messenger, Amazon Echo, and gathering machine learning data from my Samsung refrigerator, what are you even doing?",
    tags: "FOMO, technology, trends, microservices",
    createdAt: "2023-08-08T12:00:00.000Z",
  },
  {
    title: "Finding Your Own Stack Overflow Posts",
    image: "finding-your-own-stack-overflow-posts.jpg",
    headline: "It's almost like you've had this problem before",
    tags: "Stack Overflow, development, debugging, problem-solving",
    createdAt: "2024-01-27T13:00:00.000Z",
  },
  {
    title: "Fitting Actual User Data Into The Design",
    image: "fitting-actual-user-data.jpg",
    headline: "People have names of varying lengths, who knew?",
    tags: "design, user data, UX, UI",
    createdAt: "2023-08-08T12:00:00.000Z",
  },
  {
    title: "Fizz Buzz",
    image: "fizz-buzz.jpeg",
    headline: "Ensuring the futility of your interview process",
    tags: "interview, coding challenge, Fizz Buzz, hiring",
    createdAt: "2023-08-08T12:00:00.000Z",
  },
  {
    title: "Forgetting how your Legacy Network Works",
    image: "forgetting-network.jpg",
    headline: "The art of excuses",
    tags: "networking, legacy systems, IT, excuses",
    createdAt: "2023-08-08T12:00:00.000Z",
  },
  {
    title: "Being Friends with Gay Furries",
    image: "friend-gay-furries.jpg",
    headline: "Learn to Accept That the Other Engineers Are Dogs",
    tags: "friendship, acceptance, diversity, community",
    createdAt: "2023-08-08T12:00:00.000Z",
  },
  {
    title: "Functional Thinking",
    image: "functional-thinking.png",
    headline: "Paradigm over syntax",
    tags: "functional programming, development, programming paradigms",
    createdAt: "2023-08-08T12:00:00.000Z",
  },
  {
    title: "Getting it to Work",
    image: "getting-it-to-work.jpg",
    headline: "Achievement despite ignorance",
    tags: "problem-solving, development, achievement, programming",
    createdAt: "2023-08-08T12:00:00.000Z",
  },
  {
    title: 'Getting "LGTM" Out of This Obstructionist Prick',
    image: "getting-lgtm-out-of-this-obstructionist.jpg",
    headline:
      "The Essential Guide to His Mental Code Linter & Outdated SQL Performance Tips",
    tags: "code review, collaboration, communication, senior, github",
    createdAt: "2024-02-04T13:00:00.000Z",
  },
  {
    title: "Good Enough to Ship",
    image: "good-enough-to-ship.jpg",
    headline: "Letting your baby out of the nest - for better or worse",
    tags: "shipping, product launch, development, quality",
    createdAt: "2023-08-08T12:00:00.000Z",
  },
  {
    title: "Googling the Error Message",
    image: "google-error-message.jpg",
    headline: "The internet will make those bad words go away",
    tags: "error handling, debugging, Google, programming",
    createdAt: "2023-08-08T12:00:00.000Z",
  },
  {
    title: "Googling for the Regex",
    image: "googling-for-the-regex.jpg",
    headline: "The Internet will do the remembering for you",
    tags: "regex, programming, search, Google",
    createdAt: "2023-08-08T12:00:00.000Z",
  },
  {
    title: "The Guy Who Wrote This Is Gone",
    image: "guy-who-wrote-this-is-gone.jpg",
    headline: "No comments, no documentation but 20 tickets",
    tags: "documentation, legacy code, programming, maintenance",
    createdAt: "2023-08-08T12:00:00.000Z",
  },
  {
    title: "Hating on Languages You Don't Use",
    image: "hating-language.jpeg",
    headline: "Your taste, experiences, and objectives are the absolute truth",
    tags: "programming languages, bias, opinions, development",
    createdAt: "2023-08-08T12:00:00.000Z",
  },
  {
    title: "Hating Other People's Code",
    image: "hating-other-code.jpg",
    headline: "It's only a clever hack if you're the one who wrote it",
    tags: "code review, programming, development, collaboration",
    createdAt: "2023-08-08T12:00:00.000Z",
  },
  {
    title: "Hiring Ninjas",
    image: "hiring-ninjas.jpg",
    headline: "Ninjas love open office layouts and unlimited vacation time",
    tags: "hiring, recruiting, HR, job search",
    createdAt: "2024-01-27T12:00:00.000Z",
  },
  {
    title: "Hoping Nobody Hacks You",
    image: "hoping-nobody-hacks.jpg",
    headline: "Security by optimism and prayer",
    tags: "security, hacking, optimism, risk management",
    createdAt: "2023-08-08T12:00:00.000Z",
  },
  {
    title: "Hoping for the Right Interview Questions",
    image: "hoping-right-interview.jpg",
    headline: "Banking on the 10% you know without Googling",
    tags: "interview, job search, preparation, luck",
    createdAt: "2023-08-08T12:00:00.000Z",
  },
  {
    title: "Hoping This Works",
    image: "hoping-this-works.jpg",
    headline: "Solutions that might fix the problem without breaking anything",
    tags: "problem-solving, development, programming, hope",
    createdAt: "2023-08-08T12:00:00.000Z",
  },
  {
    title: "Ignoring Deprecation Warnings",
    image: "ignoring-deprecation-warnings.jpg",
    headline: "Maybe they'll just go away on their own.",
    tags: "deprecation, warnings, programming, maintenance",
    createdAt: "2023-08-08T12:00:00.000Z",
  },
  {
    title: "Solving Imaginary Scaling Issues",
    image: "imaginary-scaling-issues.jpg",
    headline:
      "At Scale | Getting the wrong idea from that conference talk you attended",
    tags: "scaling, performance, development, misconceptions, conference",
    createdAt: "2023-08-08T12:00:00.000Z",
  },
  {
    title: "Implementing Dumb Features",
    image: "implementing-dumb-features.jpg",
    headline: 'When nobody has the confidence to say "No"',
    tags: "features, product management, development, communication, client",
    createdAt: "2024-01-27T14:00:00.000Z",
  },
  {
    title: "Insulting SHA-1 Collisions",
    image: "insulting-sha1-collisions.jpg",
    headline: "Leave unmistakable traces in the project logs | git log",
    tags: "SHA-1, git, version control, security, cryptography",
    createdAt: "2024-01-27T14:00:00.000Z",
  },
  {
    title: "It Depends",
    image: "it-depends.jpg",
    headline: "The answer to every programming question ever conceived",
    tags: "programming, answers, ambiguity, context",
    createdAt: "2023-08-08T12:00:00.000Z",
  },
  {
    title: "Kubernetes for beginners",
    image: "kubernetes-beginners.jpg",
    headline: "Containers, that'll fix it. | What could go wrong?",
    tags: "Kubernetes, containers, Docker, orchestration",
    createdAt: "2023-08-08T12:00:00.000Z",
  },
  {
    title: "Learning Machine Learning",
    image: "learn-ml.png",
    headline: "Better buy 12 more GPUs",
    tags: "machine learning, AI, GPUs, education",
    createdAt: "2023-08-08T12:00:00.000Z",
  },
  {
    title: "Losing Your Will To Live",
    image: "loosing-your-will-to-live.png",
    headline:
      "Code Maintenance Guide | The original developer isn't here for a reason",
    tags: "code maintenance, frustration, legacy code, development",
    createdAt: "2023-08-08T12:00:00.000Z",
  },
  {
    title: "Thanklessly Maintaining Open Source Software",
    image: "maintaining-open-source.jpg",
    headline: "Acting out of the goodness of your heart, or something",
    tags: "open source, maintenance, GitHub, community",
    createdAt: "2023-08-08T12:00:00.000Z",
  },
  {
    title: "Making Jeff Bezos Richer",
    image: "making-jeff-bezos-richer.jpg",
    headline:
      "Why did I get charged $240 if I was just testing? | Depend utterly on AWS",
    tags: "AWS, cloud, Amazon, hosting, billing, devops",
    createdAt: "2024-01-27T14:00:00.000Z",
  },
  {
    title: "Managing IP Networks",
    image: "managing-ip-networks.jpg",
    headline: "with Cisco Router | Help for IP Network Administrators",
    tags: "IP networks, Cisco, network management, administration",
    createdAt: "2023-08-08T12:00:00.000Z",
  },
  {
    title: "Managing Managers",
    image: "managing-managers.png",
    headline: "Dealing With Bad Managers | How To Fix What Your Manager Did",
    tags: "management, leadership, organizational behavior, conflict resolution",
    createdAt: "2023-08-08T12:00:00.000Z",
  },
  {
    title: "Mastering the Go type system",
    image: "mastering-the-go-type-system.jpg",
    headline:
      'Because "They are not capable of understanding a brilliant language". | if err != nil',
    tags: "Go, type system, programming, development, nil",
    createdAt: "2023-08-08T12:00:00.000Z",
  },
  {
    title: "Memorizing Six Git Commands",
    image: "memorizing-six-git-commands.jpg",
    headline: "The popular approach to version control",
    tags: "Git, version control, commands, complexity",
    createdAt: "2024-01-27T14:00:00.000Z",
  },
  {
    title: "Microservices",
    image: "microservices.jpg",
    headline:
      "Protecting yourself against gratuitous network layers | Their Prevention and Cure",
    tags: "microservices, architecture, distributed systems, scalability",
    createdAt: "2024-01-27T14:00:00.000Z",
  },
  {
    title: "Excuses to Miss Meetings",
    image: "miss-meeting.jpg",
    headline: "Timing critical tasks to coincide with morning stand-up",
    tags: "meetings, time management, excuses, productivity",
    createdAt: "2023-08-08T12:00:00.000Z",
  },
  {
    title: "Moving Fast and Breaking Things",
    image: "moving-fast-and-breaking.jpg",
    headline: "Just put the technical debt on my credit card",
    tags: "development, technical debt, agility, risk-taking",
    createdAt: "2023-08-08T12:00:00.000Z",
  },
  {
    title: "Taking on Needless Dependencies",
    image: "needless-dependencies.jpeg",
    headline: "Code written by some stranger on the internet is always perfect",
    tags: "dependencies, code management, risk, development",
    createdAt: "2023-08-08T12:00:00.000Z",
  },
  {
    title: "Excuses for Not Writing Unit Tests",
    image: "not-writing-unit-tests.jpg",
    headline: "Your application is a special snowflake",
    tags: "unit tests, testing, excuses, software development",
    createdAt: "2023-08-08T12:00:00.000Z",
  },
  {
    title: "Overwriting your teammates' code",
    image: "overwriting-code.png",
    headline: '"My code is better than yours anyway" | Be a team player',
    tags: "teamwork, collaboration, code review, development",
    createdAt: "2023-08-08T12:00:00.000Z",
  },
  {
    title: "Making Your Own Parody Covers",
    image: "own-parody-covers.jpg",
    headline: "Dont even leave Slack to do it",
    tags: "parody, creativity, design, humor",
    createdAt: "2023-08-08T12:00:00.000Z",
  },
  {
    title: "Parsing HTML using Regular Expressions",
    image: "parsing-html-using-regex.jpg",
    headline:
      "The ichor permeates MY FACE MY FACE oh god no NO NOO | No stop the angels are not real",
    tags: "HTML, regex, parsing",
    createdAt: "2023-08-08T12:00:00.000Z",
  },
  {
    title: "Pasting Code from Some Random 2012 Node.js Tutorial",
    image: "pasting-code-from-2012-tutorial.jpg",
    headline:
      "It was the first Google result and you only live once | And Hoping for the Best",
    tags: "googling, Node.js, tutorial, copy-pasting, development",
    createdAt: "2023-08-08T12:00:00.000Z",
  },
  {
    title: "Winning Pedantic Arguments",
    image: "pedantic-arguments.jpg",
    headline:
      "Anyone who disagrees with you is your enemy and you must crush them",
    tags: "arguments, pedantic, communication, conflict",
    createdAt: "2023-08-08T12:00:00.000Z",
  },
  {
    title: "Phishing",
    image: "phishing.jpg",
    headline: "Professional Identity Theft Techniques",
    tags: "phishing, cybersecurity, identity theft, hacking",
    createdAt: "2023-08-08T12:00:00.000Z",
  },
  {
    title: "Pointless Meetings",
    image: "pointless-meeting.jpg",
    headline: "How To Survive All The Pointless Meetings",
    tags: "meetings, productivity, time management, corporate culture",
    createdAt: "2023-08-08T12:00:00.000Z",
  },
  {
    title: "Practical Testing",
    image: "practical-testing.jpg",
    headline:
      "It worked fine three months ago | Just click around and see if anything breaks",
    tags: "testing, software development, quality assurance, debugging",
    createdAt: "2023-08-08T12:00:00.000Z",
  },
  {
    title: "Pretending you know what you're doing",
    image: "pretending-you-know.jpeg",
    headline: "Advanced stack overflow copy pasting for beginners",
    tags: "pretending, knowledge, Stack Overflow, development",
    createdAt: "2023-08-08T12:00:00.000Z",
  },
  {
    title: "printf() Debugging",
    image: "printf-debugging.jpg",
    headline: "Who needs breakpoints?",
    tags: "debugging, development, programming",
    createdAt: "2024-01-27T13:00:00.000Z",
  },
  {
    title: "Solving Problems That Don't Exist",
    image: "problem-that-dont-exist.jpg",
    headline: "The Why's and How's",
    tags: "problem-solving, overengineering, development, complexity",
    createdAt: "2023-08-08T12:00:00.000Z",
  },
  {
    title: "Procrastination",
    image: "procrastination.png",
    headline: "The Why's and How's",
    tags: "procrastination, time management, productivity, lazy",
    createdAt: "2023-08-08T12:00:00.000Z",
  },
  {
    title: "Rationalizing Your Awful Hackjob",
    image: "rationalizing-hackjob.jpg",
    headline:
      "Not thinking about how much pain this is going to cause in the future",
    tags: "rationalizing, hacking, programming, future problems",
    createdAt: "2023-08-08T12:00:00.000Z",
  },
  {
    title: "Redownloading the Git Repo",
    image: "redownloading-the-git-repo.jpg",
    headline: "Paste the changes | Ignoring Git Merge",
    tags: "GitHub, version control, merge, development, conflicts",
    createdAt: "2024-01-27T13:00:00.000Z",
  },
  {
    title: "Regex by Trial and Error",
    image: "regex-by-error.jpg",
    headline: "Combining slashes and dots until a thing happens",
    tags: "regex, trial and error, programming, pattern matching",
    createdAt: "2023-08-08T12:00:00.000Z",
  },
  {
    title: "Remembering What to Google",
    image: "remembering-what-to-google.jpg",
    headline: "How you get anything done ever",
    tags: "Google, search, memory, productivity",
    createdAt: "2023-08-08T12:00:00.000Z",
  },
  {
    title: "Resume Driven Development",
    image: "resume-driven-dev.jpg",
    headline: "The passionate, functional, micro-serviced approach",
    tags: "resume, development, career, technology trends",
    createdAt: "2023-08-08T12:00:00.000Z",
  },
  {
    title: "Rewriting Your Front End Every Six Weeks",
    image: "rewriting-frontend.jpeg",
    headline:
      "This time you have definitely chosen the right libraries and build tools",
    tags: "front-end development, rewriting, libraries, build tools",
    createdAt: "2023-08-08T12:00:00.000Z",
  },
  {
    title: "Rubber Duck Debugging",
    image: "rubber-duck-debugging.jpg",
    headline: "Figuring it out without wasting someone elses time",
    tags: "debugging, development, programming, problem-solving, junior",
    createdAt: "2024-02-04T13:00:00.000Z",
  },
  {
    title: "Adding and Removing & and * at random until rustc is happy",
    image: "rust-is-happy.png",
    headline: "50 essential concepts",
    tags: "cpp, Rust, programming, reference, pointer",
    createdAt: "2023-08-08T12:00:00.000Z",
  },
  {
    title: "SAAS Addiction",
    image: "saas-addiction.jpg",
    headline: "Maybe there's an API for that",
    tags: "aws, SAAS, addiction, cloud, software, APIs",
    createdAt: "2023-08-08T12:00:00.000Z",
  },
  {
    title: "Saturday",
    image: "saturday.jpg",
    headline: "How to handle work saturation",
    tags: "work, life, balance, sleep, burnout, productivity",
    createdAt: "2024-01-27T14:00:00.000Z",
  },
  {
    title: "Scalable parallel computational models",
    image: "scalable-parallel-computational-models.jpg",
    headline: "It works on my machine",
    tags: "parallel computing, scalability, distributed systems, cloud",
    createdAt: "2024-01-27T14:00:00.000Z",
  },
  {
    title: "Shrodinger's backup",
    image: "schrodingers-backup.jpg",
    headline:
      "The condition of any backup is unknown until a restore is attempted.",
    tags: "backup, restore, data, risk, devops",
    createdAt: "2023-08-08T12:00:00.000Z",
  },
  {
    title: "Getting Around to Security Next Month",
    image: "security-next-month.jpg",
    headline:
      "Putting off critical tasks until everyone forgets about them | If there's time",
    tags: "security, procrastination, risk management, priorities",
    createdAt: "2023-08-08T12:00:00.000Z",
  },
  {
    title: "Self-Documenting Code",
    image: "self-documenting-code.jpg",
    headline: "Who needs comments anyway?",
    tags: "comments, documentation, code, programming, joke",
    createdAt: "2024-01-27T14:00:00.000Z",
  },
  {
    title: "Loosing files",
    image: "server-down.png",
    headline: "book cover",
    tags: "file loss, server down, error, HTML, not found",
    createdAt: "2023-08-08T12:00:00.000Z",
  },
  {
    title: "Restoring shitty .ddl references",
    image: "shitty-ddl-ref.jpg",
    headline: "Inheritance isn't always a good thing",
    tags: "cpp, C++, inheritance, references, code restoration",
    createdAt: "2023-08-08T12:00:00.000Z",
  },
  {
    title: "Startup Success",
    image: "startup-success.jpeg",
    headline: "TechCrunch Said This Was A Billion Dollar Market",
    tags: "startup, success, business, entrepreneurship",
    createdAt: "2023-08-08T12:00:00.000Z",
  },
  {
    title: "Such Data",
    image: "such-data.jpg",
    headline: "So DevOps | Much Cloud | Very Agile",
    tags: "data, analytics, information, devops",
    createdAt: "2023-08-08T12:00:00.000Z",
  },
  {
    title: "Surviving the Kincade Fire",
    image: "surviving-the-kincade-fire.jpg",
    headline:
      "Or how not to put your servers in California | Our website melted",
    tags: "disaster recovery, risk management",
    createdAt: "2024-01-27T14:00:00.000Z",
  },
  {
    title: "Temporary Workarounds",
    image: "temporary-workarounds.jpeg",
    headline: "Who are you kidding?",
    tags: "workarounds, temporary solutions, bad code, development",
    createdAt: "2023-08-08T12:00:00.000Z",
  },
  {
    title: "Testing In Production",
    image: "testing-in-production.jpg",
    headline: "Never worry about multiple environments again!",
    tags: "guide, error, testing, production, software development, environments",
    createdAt: "2023-08-08T12:00:00.000Z",
  },
  {
    title: "Thankfulness",
    image: "thankfulness.jpeg",
    headline: "Recognizing how great we have it",
    tags: "thankfulness, gratitude, success, positivity, win, production",
    createdAt: "2023-08-08T12:00:00.000Z",
  },
  {
    title: "The Cyber",
    image: "the-cyber.jpg",
    headline: "Great cyber, the best cyber, yuuuuuge cyber",
    tags: "cyber, cybersecurity, internet, technology",
    createdAt: "2023-08-08T12:00:00.000Z",
  },
  {
    title: "The Importance of Backing Up Data",
    image: "the-importance-of-backing-up-data.jpg",
    headline: "Oh god please copy | Copying from dying drives",
    tags: "data, backup, loss, recovery, devops",
    createdAt: "2024-01-27T13:00:00.000Z",
  },
  {
    title: "The Joys of Generic Parameter Types",
    image: "the-joys-of-generic-parameter-types.jpg",
    headline:
      "Map<T, List<Map<? super Key, U>>> simpleMap | Java's Take on Abstraction",
    tags: "Java, generics, abstraction, programming, development, oop",
    createdAt: "2024-01-27T13:00:00.000Z",
  },
  {
    title: "Trivial Details",
    image: "trivial-details.jpeg",
    headline: "Perfecting the parts that don't matter",
    tags: "details, perfectionism, focus, trivialities",
    createdAt: "2023-08-08T12:00:00.000Z",
  },
  {
    title: "Trying Stuff Until it Works",
    image: "trying-stuff-until-it-works.jpg",
    headline: "Software can be chaotic, but we make it work",
    tags: "trial and error, problem-solving, software development",
    createdAt: "2023-08-08T12:00:00.000Z",
  },
  {
    title: "Upsetting Your Coworkers With Python",
    image: "upsetting-with-python.png",
    headline: "Using list, map, lambda, and filter on a single line",
    tags: "Python, coding style, coworkers, programming",
    createdAt: "2023-08-08T12:00:00.000Z",
  },
  {
    title: "Useless Git Commit Messages",
    image: "useless-git-commit-message.jpg",
    headline: 'git commit -m "changes"',
    tags: "Git, commit messages, version control, collaboration",
    createdAt: "2023-08-08T12:00:00.000Z",
  },
  {
    title: "Using Open Source Software",
    image: "using-open-source-software.jpg",
    headline: "That'll show 'em | Yelling at the maintainer",
    tags: "open source, software, community, github",
    createdAt: "2024-01-27T13:00:00.000Z",
  },
  {
    title: "Vague Understanding Of Computer Science",
    image: "vague-understanding-of-computer-science.jpg",
    headline:
      "Probably be able explain a sorting algorithm if it ever comes up",
    tags: "computer science, understanding, algorithms, education",
    createdAt: "2023-08-08T12:00:00.000Z",
  },
  {
    title: "Variable Naming",
    image: "variable-naming.png",
    headline: "The hardest part of coding | Shave Hours Off Any Project",
    tags: "variable naming, coding, programming, best practices",
    createdAt: "2023-08-08T12:00:00.000Z",
  },
  {
    title: "What is Ligma",
    image: "what-is-ligma.png",
    headline: "Prepare for the worst",
    tags: "Ligma, meme, internet culture",
    createdAt: "2023-08-08T12:00:00.000Z",
  },
  {
    title: "Whiteboard Algorithms",
    image: "whiteboard-algo.jpeg",
    headline: "Useless skills for interviews at public tech companies.",
    tags: "old, algorithms, whiteboard, interviews, tech companies",
    createdAt: "2023-08-08T12:00:00.000Z",
  },
  {
    title: "Whiteboard Interviews",
    image: "whiteboard-interviews.png",
    headline:
      "Putting the candidate through the same bullshit you went through",
    tags: "whiteboard interviews, LeetCode, tech interviews, hiring",
    createdAt: "2023-08-08T12:00:00.000Z",
  },
  {
    title: "Keeping the Whole App in Your Head",
    image: "whole-app-in-head.jpg",
    headline: 'Also known as "job security"',
    tags: "application, memory, job security, software development",
    createdAt: "2023-08-08T12:00:00.000Z",
  },
  {
    title: "Windows RAM forensics",
    image: "windows-ram-forensics.jpg",
    headline: "Official guide | Navigating Task Manager",
    tags: "Windows, RAM, task manager, troubleshooting",
    createdAt: "2024-01-27T13:00:00.000Z",
  },
  {
    title: "Using won't fix in your linter",
    image: "wont-fix-in-linter.png",
    headline: "How to improve your code quality",
    tags: "linter, code quality, SonarQube, development",
    createdAt: "2023-08-08T12:00:00.000Z",
  },
  {
    title: "Working with Users",
    image: "working-with-users.jpg",
    headline: "I didn't do anything! | You broke it! | I don't see ANYTHING",
    tags: "users, development, collaboration, communication, support",
    createdAt: "2024-01-27T13:00:00.000Z",
  },
  {
    title: "Works on my machine",
    image: "works-on-my-pc.jpeg",
    headline: "How to convince your manager",
    tags: "development, debugging, environment, collaboration",
    createdAt: "2023-08-08T12:00:00.000Z",
  },
  {
    title: "Writing Code that Nobody Else Can Read",
    image: "writing-code-nobody-else-can-read.jpg",
    headline: "Does it run? Just leave it alone.",
    tags: "coding, readability, collaboration, development",
    createdAt: "2023-08-08T12:00:00.000Z",
  },
  {
    title: "Writing documentation",
    image: "writing-documentation.png",
    headline: "ToDo | Coming soon",
    tags: "documentation, writing, to-do, development",
    createdAt: "2023-08-08T12:00:00.000Z",
  },
  {
    title: "Z-Index: 100000000000",
    image: "z-index-1000.jpg",
    headline: "Real World CSS | You've come this far, no going back now.",
    tags: "CSS, z-index, web development, styling",
    createdAt: "2023-08-08T12:00:00.000Z",
  },
  {
    title: "ZOOM account, I have one!",
    image: "zoom-account.jpg",
    headline: "sharing my private information | who needs privacy",
    tags: "Zoom, privacy, online meetings, communication",
    createdAt: "2023-08-08T12:00:00.000Z",
  },
  {
    title: "ACK",
    image: "ack.jpg",
    headline: "UNIX Power Tools",
    tags: "UNIX, ACK, power tools, command-line",
    createdAt: "2023-08-08T12:00:00.000Z",
  },
  {
    title: "Angry Admin",
    image: "angry-admin.jpg",
    headline: "Keeping Uppity Users At Bay | Find Your Inner Rage",
    tags: "administration, anger, management, users",
    createdAt: "2023-08-08T12:00:00.000Z",
  },
];

export default BOOK_LIBRARY;