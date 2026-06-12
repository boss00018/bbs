import { useState } from 'react';
import { Mail, Send, CheckCircle2 } from 'lucide-react';

const GithubIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.604-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836c.85.004 1.705.114 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.741 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
  </svg>
);

const LinkedinIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | sending | success

  const onSubmit = (e) => {
    e.preventDefault();
    setStatus('sending');
    
    const { name, email, message } = form;
    // Open mail client with pre-filled content
    setTimeout(() => {
      window.location.href = `mailto:bhanushreebollam@gmail.com?subject=Portfolio Contact from ${name}&body=${encodeURIComponent(message)}%0A%0AFrom: ${email}`;
      setStatus('success');
      setForm({ name: '', email: '', message: '' });
      setTimeout(() => setStatus('idle'), 4000);
    }, 1200);
  };

  return (
    <section id="contact" className="section contact">
      <div className="section__inner">
        <h2 className="section__title">Get In <span className="accent">Touch</span></h2>
        <p className="section__sub">Have an interesting project or position? Let's talk.</p>
        <div className="contact__grid">
          <div className="contact__info">
            <a href="mailto:bhanushreebollam@gmail.com" className="contact__link">
              <Mail size={18} /> bhanushreebollam@gmail.com
            </a>
            <a href="https://github.com/" target="_blank" rel="noreferrer" className="contact__link">
              <GithubIcon /> github.com/bhanushreebollam
            </a>
            <a href="https://linkedin.com/in/" target="_blank" rel="noreferrer" className="contact__link">
              <LinkedinIcon /> linkedin.com/in/bhanushreebollam
            </a>
            <div className="contact__badge">
              <span className="badge-dot" />
              Available for Freelance
            </div>
          </div>
          
          <form className="contact__form" onSubmit={onSubmit}>
            {/* Name */}
            <div className="contact__field">
              <input
                type="text"
                id="contact-name"
                required
                value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
                placeholder=" "
                className="contact__input"
              />
              <label htmlFor="contact-name" className="contact__label">Name</label>
              <div className="contact__focus-border" />
            </div>

            {/* Email */}
            <div className="contact__field">
              <input
                type="email"
                id="contact-email"
                required
                value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
                placeholder=" "
                className="contact__input"
              />
              <label htmlFor="contact-email" className="contact__label">Email</label>
              <div className="contact__focus-border" />
            </div>

            {/* Message */}
            <div className="contact__field">
              <textarea
                id="contact-msg"
                required
                rows={5}
                value={form.message}
                onChange={e => setForm({ ...form, message: e.target.value })}
                placeholder=" "
                className="contact__textarea"
              />
              <label htmlFor="contact-msg" className="contact__label">Your Message</label>
              <div className="contact__focus-border" />
            </div>

            {/* Submit */}
            <button 
              type="submit" 
              className="btn btn--primary"
              disabled={status !== 'idle'}
              style={{ width: 'fit-content', minWidth: '160px', justifyContent: 'center' }}
            >
              {status === 'idle' && (
                <>
                  <span>Send Message</span>
                  <Send size={15} />
                </>
              )}
              {status === 'sending' && (
                <div className="spinner" style={{ width: '16px', height: '16px', border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
              )}
              {status === 'success' && (
                <>
                  <span>Sent!</span>
                  <CheckCircle2 size={15} />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
