export type Story = {
  id: string;
  content: string;
};

const D = "\n";

const STORY_LIBRARY: Story[] = [
  {
    id: "10x-engineer",
    content:
      "In the bustling heart of Silicon Valley, where the coffee is always brewing and the code never sleeps, there lived a legend among programmers, known far and wide as the 10x Engineer. With skills so sharp they could debug with a mere glance and an ability to type faster than the speed of thought, our hero was the embodiment of every startup’s dream.\n" +
      "\n" +
      'One fine morning, as the Californian sun broke the horizon, bathing the valley in a golden glow, the 10x Engineer, let\'s call him CodeMaster Rick, stumbled upon an ad in the "Silicon Valley Daily." It read: "Money, fame, maintainable code. The Triple Threat Programming Contest. Are you up for the challenge?" Intrigued and always up for a challenge that could stimulate his neurons, Rick decided to enter.\n' +
      "\n" +
      'The contest was simple yet daunting. The participants had to develop a new social media platform, "Chirper," where users could send chirps (essentially tweets but for birds). The catch? They had to do it over the weekend, and the code had to be not just functional but maintainable.\n' +
      "\n" +
      "The clock started ticking, and the participants furiously got down to business. While others were busy setting up their Kubernetes clusters or debating the merits of React vs. Vue, Rick had a different approach. He opened his trusty old laptop, whispered a few encouraging words to it, and began his work.\n" +
      "\n" +
      "As the weekend progressed, something peculiar happened. Rick’s reputation had preceded him, and a crowd gathered around his workspace, expecting to witness the magic of the 10x Engineer firsthand. However, all they saw was Rick calmly sipping his latte and occasionally typing away, his face an epitome of tranquility among the chaos.\n" +
      "\n" +
      "Sunday night arrived, and it was time for the submissions. Rick submitted his project with a simple git push, and the judges began their review. To their astonishment, Rick's code was not just functional; it was a masterpiece. It was as if Shakespeare himself had decided to write code. Every function was a sonnet, every variable declaration a delicate verse.\n" +
      "\n" +
      "But the true shock came during the maintainability test. When the judges tried to introduce new features, the code welcomed the changes with open arms, almost as if it had been expecting them. It was, in every sense, future-proof.\n" +
      "\n" +
      "Rick won the contest, of course. The money and fame followed, but what truly made headlines across Silicon Valley was the maintainable code. It became a legend, a benchmark for quality and productivity.\n" +
      "\n" +
      "From that day forward, every programmer aspired not just to be a 10x Engineer but to write code like CodeMaster Rick - code that wasn't just fast and efficient but beautiful and maintainable. And as for Rick? He just went back to his quiet life, occasionally chuckling at the thought of his code being studied and admired, knowing well that the true secret to his success was a love for the craft and a really good latte.",
  },
  {
    id: "agile-micromanagement",
    content:
      'In the bustling city of Techtopia, nestled between the towering skyscrapers of innovation and the sprawling campuses of start-ups, there existed a software company known as Agile Innovations Inc. Agile Innovations was renowned for its commitment to the Agile methodology, or at least, that\'s what its glossy brochures claimed. The reality, however, was a peculiar blend of principles and practices that the employees affectionately referred to as "Water-Fall with Stand-ups."\n' +
      "\n" +
      'At the heart of this paradoxical methodology was Steve, the Project Manager, a man who had read every book on Agile methodologies but had somehow missed the point entirely. Steve was a firm believer in micromanagement, a trait that he cleverly disguised as "ensuring maximum efficiency and productivity." His weapon of choice was the daily stand-up meeting, a ritual that had slowly evolved into a marathon session of task scrutiny and detailed reporting that would make even a waterfall advocate blush.\n' +
      "\n" +
      "The story begins on a Monday morning, as the team gathered for their daily stand-up in the designated Agile Arena, a room adorned with posters of sprints and burndown charts that no one really understood. The team stood in a circle, coffee cups in hand, bracing themselves for the onslaught of inquiries.\n" +
      "\n" +
      "Steve kicked off the meeting with his usual gusto, \"Good morning team! Let's make this quick. I need updates on every task, down to the last detail. Remember, we're Agile!\"\n" +
      "\n" +
      "Jenny, the lead developer, was the first to speak. \"I'm working on the login feature, but I've hit a snag with the authentication service. It might take a bit longer than expected.\"\n" +
      "\n" +
      "Before she could even finish, Steve interjected, \"Jenny, remember our sprint goal. We need to pivot and prioritize. Can't you just bypass the service for now? We'll fix it in the next sprint.\"\n" +
      "\n" +
      'The team exchanged glances, the irony of "pivoting" in a predetermined sprint lost on no one.\n' +
      "\n" +
      "As the stand-up dragged on, it became increasingly clear that Steve's understanding of Agile was, in fact, a masterclass in cognitive dissonance. Tasks were dissected, deadlines were scrutinized, and the team's autonomy was but a distant memory. The stand-up, a ceremony meant to foster communication and adaptability, had morphed into a daily trial by fire.\n" +
      "\n" +
      "The climax of this story occurred during the review of a critical project milestone. The client was on-site, eager to see the progress. Steve, ever the showman, presented a feature-rich demo that masked the chaotic underbelly of missed deadlines and technical debt.\n" +
      "\n" +
      "However, as fate would have it, the client asked a question that required delving into the very authentication service Jenny had warned about. As Steve navigated through the application, the inevitable happened—the system crashed, and with it, the illusion of Agile Innovations' flawless process.\n" +
      "\n" +
      "In the aftermath of the demo disaster, a revelation dawned upon the team. Agile was not about micromanagement or rigid adherence to predefined tasks. It was about adaptability, teamwork, and, most importantly, trust.\n" +
      "\n" +
      "Led by Jenny, the team proposed a new approach to their projects. They advocated for genuine Agile practices—shorter stand-ups focused on impediments rather than exhaustive task updates, collaboration over micromanagement, and embracing change rather than fearing it.\n" +
      "\n" +
      "Steve, humbled by the events and the team's feedback, agreed to the changes. Agile Innovations Inc. slowly transformed, embodying the true spirit of Agile. Stand-ups became forums for support and collaboration, sprints were planned with flexibility in mind, and the team regained their autonomy.\n" +
      "\n" +
      "The company's projects flourished under this new methodology, proving that success in Agile comes not from the rigid enforcement of processes but from the collective growth and adaptation of the team.\n" +
      "\n" +
      'And so, the legend of "Water-Fall with Stand-ups" became a cautionary tale, a reminder that Agile is a mindset, not a checklist. Agile Innovations Inc. had learned its lesson, and in doing so, had become a beacon of genuine Agile practices in the heart of Techtopia.',
  },
];

export default STORY_LIBRARY;
