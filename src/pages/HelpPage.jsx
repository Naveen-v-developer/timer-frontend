"use client"

import { useNavigate } from "react-router-dom"
import { useState } from "react"
import "./HelpPage.css"

const HelpPage = () => {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState("faq")
  const [searchQuery, setSearchQuery] = useState("")
  const [expandedFaq, setExpandedFaq] = useState(null)

  const faqData = [
    {
      id: 1,
      category: "Getting Started",
      question: "How do I start my first focus session?",
      answer: "To start your first focus session, simply go to your dashboard and click the 'Start Session' button on the timer. Set your desired duration (default is 25 minutes) and begin focusing on your task."
    },
    {
      id: 2,
      category: "Getting Started",
      question: "What is the Pomodoro Technique?",
      answer: "The Pomodoro Technique is a time management method that uses a timer to break work into intervals, traditionally 25 minutes in length, separated by short breaks. FocusBuzz implements this technique with intelligent break suggestions."
    },
    {
      id: 3,
      category: "Features",
      question: "How does AI break suggestion work?",
      answer: "Our AI analyzes your session length, focus rating, and historical data to suggest optimal break durations. The more you use FocusBuzz, the better the recommendations become."
    },
    {
      id: 4,
      category: "Features",
      question: "Can I customize my timer settings?",
      answer: "Yes! You can customize your default session length, break durations, and notification preferences in your profile settings."
    },
    {
      id: 5,
      category: "Account",
      question: "How do I reset my password?",
      answer: "Click on 'Forgot Password' on the login page, enter your email address, and we'll send you a reset link. Follow the instructions in the email to create a new password."
    },
    {
      id: 6,
      category: "Account",
      question: "Can I delete my account?",
      answer: "Yes, you can delete your account from the Profile Settings page. Please note that this action is irreversible and all your data will be permanently removed."
    },
    {
      id: 7,
      category: "Analytics",
      question: "What metrics does FocusBuzz track?",
      answer: "FocusBuzz tracks your focus sessions, total time focused, productivity streaks, focus ratings, and provides insights into your most productive times of day."
    },
    {
      id: 8,
      category: "Analytics",
      question: "How can I export my data?",
      answer: "You can export your focus session data as CSV or PDF from the Analytics page. Click on the 'Export Data' button in the top right corner."
    }
  ]

  const troubleshootingData = [
    {
      id: 1,
      issue: "Timer not starting",
      solution: "Make sure your browser allows notifications and JavaScript is enabled. Try refreshing the page or clearing your browser cache."
    },
    {
      id: 2,
      issue: "Notifications not working",
      solution: "Check your browser notification settings and ensure FocusBuzz has permission to send notifications. You can enable this in your browser settings."
    },
    {
      id: 3,
      issue: "Data not syncing",
      solution: "Ensure you have a stable internet connection. If the problem persists, try logging out and logging back in."
    },
    {
      id: 4,
      issue: "Performance issues",
      solution: "Close unnecessary browser tabs, clear your browser cache, and ensure you're using an updated browser version."
    }
  ]

  const filteredFaqs = faqData.filter(faq =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.category.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const toggleFaq = (id) => {
    setExpandedFaq(expandedFaq === id ? null : id)
  }

  return (
    <div className="help-page">
      {/* Header */}
      <header className="help-header">
        <div className="header-content">
          <button className="back-button" onClick={() => navigate("/dashboard")}>
            <span className="back-icon">←</span>
            <span>Back to Dashboard</span>
          </button>
          <div className="header-text">
            <h1 className="help-title">
              <span className="help-icon">🆘</span>
              Help & Support
            </h1>
            <p className="help-subtitle">
              Find answers to your questions and get the most out of FocusBuzz
            </p>
          </div>
        </div>
      </header>

      {/* Search Bar */}
      <section className="search-section">
        <div className="search-container">
          <div className="search-box">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="Search for help articles, FAQs, or features..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
          </div>
        </div>
      </section>

      {/* Quick Help Cards */}
      <section className="quick-help-section">
        <div className="section-container">
          <h2 className="section-title">Quick Help</h2>
          <div className="quick-help-grid">
            <div className="help-card">
              <div className="card-icon">🚀</div>
              <h3>Getting Started</h3>
              <p>Learn the basics of using FocusBuzz effectively</p>
              <button className="card-button" onClick={() => setActiveTab("getting-started")}>
                Learn More
              </button>
            </div>
            <div className="help-card">
              <div className="card-icon">⚡</div>
              <h3>Features Guide</h3>
              <p>Discover all the powerful features available</p>
              <button className="card-button" onClick={() => setActiveTab("features")}>
                Explore Features
              </button>
            </div>
            <div className="help-card">
              <div className="card-icon">🔧</div>
              <h3>Troubleshooting</h3>
              <p>Solve common issues and technical problems</p>
              <button className="card-button" onClick={() => setActiveTab("troubleshooting")}>
                Get Help
              </button>
            </div>
            <div className="help-card">
              <div className="card-icon">💬</div>
              <h3>Contact Support</h3>
              <p>Reach out to our support team directly</p>
              <button className="card-button" onClick={() => setActiveTab("contact")}>
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="help-main">
        <div className="content-container">
          {/* Tab Navigation */}
          <nav className="tab-navigation">
            <button
              className={`tab-button ${activeTab === "faq" ? "active" : ""}`}
              onClick={() => setActiveTab("faq")}
            >
              <span className="tab-icon">❓</span>
              FAQ
            </button>
            <button
              className={`tab-button ${activeTab === "getting-started" ? "active" : ""}`}
              onClick={() => setActiveTab("getting-started")}
            >
              <span className="tab-icon">🚀</span>
              Getting Started
            </button>
            <button
              className={`tab-button ${activeTab === "features" ? "active" : ""}`}
              onClick={() => setActiveTab("features")}
            >
              <span className="tab-icon">⚡</span>
              Features
            </button>
            <button
              className={`tab-button ${activeTab === "troubleshooting" ? "active" : ""}`}
              onClick={() => setActiveTab("troubleshooting")}
            >
              <span className="tab-icon">🔧</span>
              Troubleshooting
            </button>
            <button
              className={`tab-button ${activeTab === "contact" ? "active" : ""}`}
              onClick={() => setActiveTab("contact")}
            >
              <span className="tab-icon">💬</span>
              Contact
            </button>
          </nav>

          {/* Tab Content */}
          <div className="tab-content">
            {/* FAQ Tab */}
            {activeTab === "faq" && (
              <div className="faq-content">
                <div className="content-header">
                  <h2>Frequently Asked Questions</h2>
                  <p>Find quick answers to the most common questions about FocusBuzz</p>
                </div>
                
                <div className="faq-categories">
                  {["All", "Getting Started", "Features", "Account", "Analytics"].map(category => (
                    <button
                      key={category}
                      className="category-filter"
                      onClick={() => setSearchQuery(category === "All" ? "" : category)}
                    >
                      {category}
                    </button>
                  ))}
                </div>

                <div className="faq-list">
                  {filteredFaqs.map(faq => (
                    <div key={faq.id} className="faq-item">
                      <button
                        className="faq-question"
                        onClick={() => toggleFaq(faq.id)}
                      >
                        <span className="category-tag">{faq.category}</span>
                        <span className="question-text">{faq.question}</span>
                        <span className={`expand-icon ${expandedFaq === faq.id ? "expanded" : ""}`}>
                          ▼
                        </span>
                      </button>
                      {expandedFaq === faq.id && (
                        <div className="faq-answer">
                          <p>{faq.answer}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Getting Started Tab */}
            {activeTab === "getting-started" && (
              <div className="getting-started-content">
                <div className="content-header">
                  <h2>Getting Started with FocusBuzz</h2>
                  <p>Follow these steps to make the most of your productivity journey</p>
                </div>

                <div className="steps-guide">
                  <div className="step-item">
                    <div className="step-number">1</div>
                    <div className="step-content">
                      <h3>Create Your Account</h3>
                      <p>Sign up with your email and create a secure password. Verify your email to get started.</p>
                    </div>
                  </div>
                  <div className="step-item">
                    <div className="step-number">2</div>
                    <div className="step-content">
                      <h3>Set Up Your Profile</h3>
                      <p>Customize your preferences, set your default session length, and configure notifications.</p>
                    </div>
                  </div>
                  <div className="step-item">
                    <div className="step-number">3</div>
                    <div className="step-content">
                      <h3>Start Your First Session</h3>
                      <p>Click the timer on your dashboard, set your focus duration, and begin your productive session.</p>
                    </div>
                  </div>
                  <div className="step-item">
                    <div className="step-number">4</div>
                    <div className="step-content">
                      <h3>Rate Your Focus</h3>
                      <p>After each session, rate your focus level to help our AI provide better break suggestions.</p>
                    </div>
                  </div>
                  <div className="step-item">
                    <div className="step-number">5</div>
                    <div className="step-content">
                      <h3>Track Your Progress</h3>
                      <p>View your analytics to see your productivity trends and celebrate your achievements.</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Features Tab */}
            {activeTab === "features" && (
              <div className="features-content">
                <div className="content-header">
                  <h2>FocusBuzz Features</h2>
                  <p>Discover all the powerful tools designed to boost your productivity</p>
                </div>

                <div className="features-grid">
                  <div className="feature-detail">
                    <div className="feature-icon">⏰</div>
                    <h3>Smart Focus Timer</h3>
                    <p>Customizable timer with Pomodoro technique support. Set your preferred session length and get gentle reminders to stay focused.</p>
                    <ul>
                      <li>Customizable session lengths</li>
                      <li>Audio and visual notifications</li>
                      <li>Pause and resume functionality</li>
                      <li>Background operation</li>
                    </ul>
                  </div>
                  <div className="feature-detail">
                    <div className="feature-icon">🤖</div>
                    <h3>AI Break Suggestions</h3>
                    <p>Our intelligent system analyzes your focus patterns to suggest optimal break durations for maximum productivity.</p>
                    <ul>
                      <li>Personalized recommendations</li>
                      <li>Learning from your patterns</li>
                      <li>Adaptive break lengths</li>
                      <li>Focus rating integration</li>
                    </ul>
                  </div>
                  <div className="feature-detail">
                    <div className="feature-icon">📊</div>
                    <h3>Analytics Dashboard</h3>
                    <p>Comprehensive insights into your productivity patterns with beautiful charts and detailed statistics.</p>
                    <ul>
                      <li>Daily, weekly, monthly views</li>
                      <li>Focus time tracking</li>
                      <li>Productivity streaks</li>
                      <li>Performance trends</li>
                    </ul>
                  </div>
                  <div className="feature-detail">
                    <div className="feature-icon">📋</div>
                    <h3>Task Management</h3>
                    <p>Organize your tasks, set priorities, and track completion alongside your focus sessions.</p>
                    <ul>
                      <li>Task creation and editing</li>
                      <li>Priority levels</li>
                      <li>Completion tracking</li>
                      <li>Session integration</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* Troubleshooting Tab */}
            {activeTab === "troubleshooting" && (
              <div className="troubleshooting-content">
                <div className="content-header">
                  <h2>Troubleshooting</h2>
                  <p>Common issues and their solutions to help you get back on track</p>
                </div>

                <div className="troubleshooting-list">
                  {troubleshootingData.map(item => (
                    <div key={item.id} className="troubleshooting-item">
                      <div className="issue-header">
                        <span className="issue-icon">⚠️</span>
                        <h3>{item.issue}</h3>
                      </div>
                      <div className="solution-content">
                        <span className="solution-label">Solution:</span>
                        <p>{item.solution}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="additional-help">
                  <div className="help-box">
                    <h3>Still having issues?</h3>
                    <p>If you're still experiencing problems, try these general troubleshooting steps:</p>
                    <ul>
                      <li>Clear your browser cache and cookies</li>
                      <li>Disable browser extensions temporarily</li>
                      <li>Try using an incognito/private browsing window</li>
                      <li>Update your browser to the latest version</li>
                      <li>Check your internet connection</li>
                    </ul>
                    <button className="contact-support-btn" onClick={() => setActiveTab("contact")}>
                      Contact Support
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Contact Tab */}
            {activeTab === "contact" && (
              <div className="contact-content">
                <div className="content-header">
                  <h2>Contact Support</h2>
                  <p>Get in touch with our support team for personalized assistance</p>
                </div>

                <div className="contact-options">
                  <div className="contact-card">
                    <div className="contact-icon">📧</div>
                    <h3>Email Support</h3>
                    <p>Send us a detailed message and we'll get back to you within 24 hours.</p>
                    <a href="mailto:support@focusbuzz.com" className="contact-button">
                      support@focusbuzz.com
                    </a>
                  </div>
                  <div className="contact-card">
                    <div className="contact-icon">💬</div>
                    <h3>Live Chat</h3>
                    <p>Chat with our support team in real-time for immediate assistance.</p>
                    <button className="contact-button">Start Live Chat</button>
                  </div>
                  <div className="contact-card">
                    <div className="contact-icon">📚</div>
                    <h3>Knowledge Base</h3>
                    <p>Browse our comprehensive documentation and tutorials.</p>
                    <button className="contact-button">Browse Articles</button>
                  </div>
                </div>

                <div className="contact-form-section">
                  <h3>Send us a message</h3>
                  <form className="contact-form">
                    <div className="form-group">
                      <label htmlFor="subject">Subject</label>
                      <select id="subject" className="form-select">
                        <option value="">Select a topic</option>
                        <option value="technical">Technical Issue</option>
                        <option value="account">Account Problem</option>
                        <option value="feature">Feature Request</option>
                        <option value="billing">Billing Question</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label htmlFor="message">Message</label>
                      <textarea
                        id="message"
                        rows="6"
                        placeholder="Describe your issue or question in detail..."
                        className="form-textarea"
                      ></textarea>
                    </div>
                    <button type="submit" className="submit-button">
                      <span className="btn-icon">📤</span>
                      Send Message
                    </button>
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}

export default HelpPage
