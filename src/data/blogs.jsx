import blog1Img from '../media/blog1.webp';
import blog2Img from '../media/blog2.webp';
import blog3Img from '../media/blog3.webp';
import blog4Img from '../media/blog4.webp';
import blog5Img from '../media/blog5.webp';
import blog6Img from '../media/blog 6.webp';
import blog7Img from '../media/blog7.webp';
import adsJpg from '../media/ads.webp';
import exampleClick from '../media/exampleClick.webp';
import chromeTension from '../media/chrometention.webp';

export const blogs = [
  {
    id: 1,
    title: 'Full Tutorial Of Virtual Mechine Box(VM Box)',
    desc: 'Learn how to set up and configure Virtual Machine Box (VM Box) for your development and testing needs.',
    thumbnail: blog1Img,
    youtube: 'wJRMthbD1M8',
    content: (
      <>
        <h3>What Is Virtual Machine?</h3>
        <p>VirtualBox is a powerful x86 and AMD64/Intel64 virtualization product for enterprise as well as home use. Not only is VirtualBox an extremely feature rich, high performance product for enterprise customers, it is also the only professional solution that is freely available as Open Source Software under the terms of the GNU General Public License (GPL) version.</p>

        <h3>What VM Box Do?</h3>
        <p>Oracle VM VirtualBox is cross-platform virtualization software. It allows users to extend their existing computer to run multiple operating systems including Microsoft Windows, Mac OS X, Linux, and Oracle Solaris, at the same time.</p>

        <h3>What VM Box Used For?</h3>
        <p>Virtual machines (VMs) allow a business to run an operating system that behaves like a completely separate computer in an app window on a desktop.</p>

        <a href="https://www.virtualbox.org/wiki/Downloads" target="_blank" rel="noopener noreferrer" className="blog-download-btn">
          Download VirtualBox Here
        </a>
      </>
    )
  },
  {
    id: 2,
    title: 'Memz Trozen Virus Demonstrations',
    desc: 'Watch the terrifying payload actions of the MEMZ trojan virus in a safe, controlled Virtual Machine environment.',
    thumbnail: blog2Img,
    youtube: 'G7qXorNwc5w',
    content: (
      <>
        <h3>In This Video Using:</h3>
        <ul>
          <li>1) VM BOX</li>
          <li>2) WINDOWS 10</li>
          <li>3) MEMZ VIRUS (JS)</li>
        </ul>

        <h3>What Is Memz Virus?</h3>
        <p>The MEMZ trojan is a malware in the form of a trojan horse made for Microsoft Windows.</p>

        <h3>Memz Trozen Actions..</h3>
        <p>The virus gained notoriety for its unique and complex payloads, which automatically activate after each other, some with delay. Examples of payloads include randomly moving the cursor slightly, opening up satirical Google searches under Google.co.ck such as &quot;how to remove a virus&quot; and &quot;how to get money&quot; on the user&apos;s web browser, and opening various random Microsoft Windows programs (such as the calculator or command prompt). True to the program&apos;s name, many parts of the virus are based on Internet memes; for example, the virus overwrites the boot sector with an animation of Nyan Cat. Leurak also created a safer version of MEMZ called MEMZ-Clean. The clean version allows the non-destructive payloads to be safely tested and gives the user full control about which payloads are active</p>

        <p className="blog-outro">So Hope You Guys Enjoy This Video And So Be Careful And Stay Healthy And Have A Great Day...</p>
      </>
    )
  },
  {
    id: 3,
    title: 'How FB Phishing Works',
    desc: 'In This Video The Full Phishing Discusses(Using FB Phishing Site)',
    thumbnail: blog3Img,
    youtube: '_aurJFy4ipM',
    content: (
      <>
        <h3>In This Video Using:</h3>
        <ul>
          <li>1) Node JS</li>
          <li>2) PUG Template Engine</li>
          <li>3) Mongo DB</li>
          <li>4) Express JS</li>
        </ul>

        <h3>What Is Phishing?</h3>
        <p>Phishing is a type of cybersecurity attack during which malicious actors send messages pretending to be a trusted person or entity.</p>

        <h3>Phishing Awarness!</h3>
        <p>So Guys now a days phishing attackers are greater as much your throught so be carefull for Phishing sites and also don&apos;t click any types of unwanted links or phishing ads links or winnerzone links or not giveing any types of case sensetive data in any website. Be Care Full, That&apos;s all about for today.</p>
      </>
    )
  },
  {
    id: 4,
    title: 'Sending Unlimited SMS With Python!',
    desc: 'In This Blog you learn How To Send Python Unlimited SMs With Pyautogui',
    thumbnail: blog4Img,
    youtube: 'oVZa3gwtvsQ',
    content: (
      <>
        <h3>In This Video Using:</h3>
        <ul>
          <li>1) Python</li>
          <li>2) Pyautogui Module</li>
          <li>3) Time Module</li>
        </ul>

        <h3>Surprise Your Friends!</h3>
        <p>Pyautogui is a module of python. That module will help you to do some tricks fun just like here one we send unlimited sms on same time in whatsapp so Let&apos;s Go.</p>

        <h3>How To install Pyautogui Module?</h3>
        <pre className="blog-code-snippet"><code>pip install pyautogui</code></pre>

        <h3>Copy The Below Code...</h3>
        <pre className="blog-code-snippet"><code>{`import pyautogui as pg
import time

time.sleep(5)

# Using For Loop

for i in range(10):
    pg.typewrite("How Are You")
    pg.press("Enter")

# Using While Loop

i = 0
while (i==5):
    pg.typewrite("Hi" + str(i))
    pg.press("Enter")
    i = i + 1`}</code></pre>
      </>
    )
  },
  {
    id: 5,
    title: "Let's Fun With Chrome Dino Game",
    desc: 'This Video Fun With Chrome Dino Game Hacked',
    thumbnail: blog5Img,
    youtube: 'GoqWzOZowpU',
    content: (
      <>
        <h3>In This Video Using:</h3>
        <ul>
          <li>1) Chrome Extension</li>
          <li>2) Javascript(JS)</li>
        </ul>

        <h3>Ultimate Dino Runner Code Mention Below...</h3>
        <pre className="blog-code-snippet"><code>{`var original = Runner.prototype.gameOver
Runner.prototype.gameOver = function ()`}</code></pre>
      </>
    )
  },
  {
    id: 6,
    title: 'Mouse Right Click Disabled/Enabled',
    desc: 'How To Mouse Right Click Enabled Or Disabled For Protect Your Webpage?',
    thumbnail: blog6Img,
    youtube: '6LhGvm9n8p4',
    content: (
      <>
        <h3>In This Video Using:</h3>
        <ul>
          <li>1) HTML</li>
          <li>2) css</li>
          <li>3) JS</li>
          <li>4) Google Chrome Extension</li>
        </ul>

        <h3>Why Mouse Right Click We Should Disabled?</h3>
        <p>Mouse Right Click Disabled for the casesensative data or pages which could be personal or could be hacked so for in this situations we can protect our website from hackers by craeting webpage which anyone couldn&apos;t be mouse right click inspact tools not be open and it will disabled.</p>
        <img src={exampleClick} alt="Right Click Disabled Example" className="blog-content-img" loading="lazy" />

        <h3>How Mouse Right Click Enabled?</h3>
        <p>We could be do it by download Chrome Extention Or Follow the bellow stuff.</p>

        <h3>Follow The Bellow Code For enable:</h3>
        <pre className="blog-code-snippet"><code>{`window.oncontextmenu = function() { return true; }`}</code></pre>
        <img src={chromeTension} alt="Chrome Extension" className="blog-content-img" loading="lazy" />
      </>
    )
  },
  {
    id: 7,
    title: 'Fixing ads.txt error from Backend',
    desc: 'How To Fix ads.txt Error Issue In Backend',
    thumbnail: blog7Img,
    youtube: 'DZd_7UilG_s',
    content: (
      <>
        <h3>In This Video Using:</h3>
        <ul>
          <li>1) Node JS</li>
          <li>2) ads.txt File</li>
          <li>3) Filezila</li>
          <li>4) Linux C-Panel</li>
          <li>5) Putty</li>
        </ul>

        <h3>What Is ads.txt error Issue?</h3>
        <p>ads.txt error issue is a issue where anytype of Google Adsense Approved user first time they saw that showing a error on main screen for fix it and if they not will fix this so it&apos;s says that it will impact on ads revenue.</p>

        <h3>Main Concent Of This Page..</h3>
        <p>Everyone could be watch that everywhere using blogspot or wordpress or anything videos happenes but in this site i told how it&apos;s work in backend like node JS, Python - DJANGO,FLASK etc. Backend site so fix this issue in your backend and stay tunes also Happy Earning.</p>

        <h3>Look At A Step Closer About That Issue</h3>
        <img src={adsJpg} alt="Ads.txt Error Example" className="blog-content-img" loading="lazy" />
      </>
    )
  },
];
