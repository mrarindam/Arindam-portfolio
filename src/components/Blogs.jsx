/* eslint-disable */
import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Mousewheel } from 'swiper/modules';
import 'swiper/css';
import './Blogs.css';

import blog1 from '../media/blog1.webp';
import blog2 from '../media/blog2.webp';
import blog3 from '../media/blog3.webp';
import blog4 from '../media/blog4.webp';
import blog5 from '../media/blog5.webp';
import blog6 from '../media/blog 6.webp';
import exampleClick from '../media/exampleClick.webp';
import chromeTension from '../media/chrometention.webp';
import blog7 from '../media/blog7.webp';
import adsJpg from '../media/ads.webp';

const blogs = [
  {
    id: 1,
    title: 'Full Tutorial Of Virtual Mechine Box(VM Box)',
    desc: 'Learn how to set up and configure Virtual Machine Box (VM Box) for your development and testing needs.',
    thumbnail: blog1,
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
    thumbnail: blog2,
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
        <p>The virus gained notoriety for its unique and complex payloads, which automatically activate after each other, some with delay. Examples of payloads include randomly moving the cursor slightly, opening up satirical Google searches under Google.co.ck such as "how to remove a virus" and "how to get money" on the user's web browser, and opening various random Microsoft Windows programs (such as the calculator or command prompt). True to the program's name, many parts of the virus are based on Internet memes; for example, the virus overwrites the boot sector with an animation of Nyan Cat. Leurak also created a safer version of MEMZ called MEMZ-Clean. The clean version allows the non-destructive payloads to be safely tested and gives the user full control about which payloads are active</p>

        <p className="blog-outro">So Hope You Guys Enjoy This Video And So Be Careful And Stay Healthy And Have A Great Day...</p>
      </>
    )
  },
  {
    id: 3,
    title: 'How FB Phishing Works',
    desc: 'In This Video The Full Phishing Discusses(Using FB Phishing Site)',
    thumbnail: blog3,
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
        <p>So Guys now a days phishing attackers are greater as much your throught so be carefull for Phishing sites and also don't click any types of unwanted links or phishing ads links or winnerzone links or not giveing any types of case sensetive data in any website. Be Care Full, That's all about for today.</p>
      </>
    )
  },
  {
    id: 4,
    title: 'Sending Unlimited SMS With Python!',
    desc: 'In This Blog you learn How To Send Python Unlimited SMs With Pyautogui',
    thumbnail: blog4,
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
        <p>Pyautogui is a module of python. That module will help you to do some tricks fun just like here one we send unlimited sms on same time in whatsapp so Let's Go.</p>

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
    thumbnail: blog5,
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
    thumbnail: blog6,
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
        <p>Mouse Right Click Disabled for the casesensative data or pages which could be personal or could be hacked so for in this situations we can protect our website from hackers by craeting webpage which anyone couldn't be mouse right click inspact tools not be open and it will disabled.</p>
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
    thumbnail: blog7,
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
        <p>ads.txt error issue is a issue where anytype of Google Adsense Approved user first time they saw that showing a error on main screen for fix it and if they not will fix this so it's says that it will impact on ads revenue.</p>

        <h3>Main Concent Of This Page..</h3>
        <p>Everyone could be watch that everywhere using blogspot or wordpress or anything videos happenes but in this site i told how it's work in backend like node JS, Python - DJANGO,FLASK etc. Backend site so fix this issue in your backend and stay tunes also Happy Earning.</p>

        <h3>Look At A Step Closer About That Issue</h3>
        <img src={adsJpg} alt="Ads.txt Error Example" className="blog-content-img" loading="lazy" />
      </>
    )
  },
];

export default function Blogs() {
  const containerRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(null);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize(); // Initial check
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Close modal on escape key and lock background scroll
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setSelectedBlog(null);
    };
    if (selectedBlog) {
      document.body.style.overflow = 'hidden'; // Prevent background scrolling
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = ''; // Restore background scrolling
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    }
  }, [selectedBlog]);

  return (
    <motion.section
      id="blogs"
      className="blogs-section"
      ref={containerRef}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 50 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ margin: "0px", once: false }}
        transition={{ duration: 0.8 }}
        className="section-header"
      >
        <div className='blogText'>
          <h2 className="section-title">My Blogs</h2>
        </div>
      </motion.div>

      <Swiper
        direction={isMobile ? 'vertical' : 'horizontal'}
        slidesPerView={isMobile ? 1.1 : 2.5}
        centeredSlides={true}
        spaceBetween={isMobile ? 20 : 60}
        grabCursor={true}
        mousewheel={{ releaseOnEdges: true }} /* Passes scroll back to Lenis when hitting the end! */
        modules={[Mousewheel]}
        className="premium-swiper"
      >
        {blogs.map((blog) => (
          <SwiperSlide key={blog.id}>
            <motion.div
              className="blog-card swiper-card"
              whileHover={{ y: -8, scale: 1.02, boxShadow: "0 15px 30px rgba(0,0,0,0.5), 0 0 25px rgba(255, 150, 0, 0.5)" }}
            >
              <div
                className="blog-thumb"
                style={blog.thumbnail ? { backgroundImage: `url(${blog.thumbnail})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}}
              ></div>
              <div className="blog-content">
                <h3>{blog.title}</h3>
                <p>{blog.desc}</p>
                <button className="blog-btn" onClick={() => setSelectedBlog(blog)}>Read Entry</button>
              </div>
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>

      <AnimatePresence>
        {selectedBlog && (
          <motion.div
            className="blog-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedBlog(null)}
            data-lenis-prevent
          >
            <motion.div
              className="blog-modal-content"
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 30 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              data-lenis-prevent
            >
              <button className="blog-modal-close" onClick={() => setSelectedBlog(null)}>
                &times;
              </button>

              <h2 className="blog-modal-title">{selectedBlog.title}</h2>

              {selectedBlog.youtube && (
                <div className="blog-modal-video-container">
                  <iframe
                    src={`https://www.youtube.com/embed/${selectedBlog.youtube}?si=hoS4UFgXW08jVrAw`}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  ></iframe>
                </div>
              )}

              <div className="blog-modal-body">
                {typeof selectedBlog.content === 'string' ? <p>{selectedBlog.content}</p> : selectedBlog.content}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
}
