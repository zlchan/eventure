import React from 'react';
import test2 from "../../assets/images/test2.png"
import './About.css';

const About = () => {
  return (
    <div className="about-us-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>We're Bringing People Together Through Experiences</h1>
          <p>Event Explorer connects passionate organizers with enthusiastic attendees to create memorable moments that matter.</p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="mission-section">
        <div className="section-container">
          <div className="section-header">
            <h2>Our Mission</h2>
            <div className="header-line"></div>
          </div>
          <div className="mission-content">
            <div className="mission-text">
              <p>At Event Explorer, we believe that meaningful connections happen through shared experiences. Our platform makes it simple to discover events that match your interests and passions, while giving organizers the tools they need to create successful gatherings.</p>
              <p>Whether you're looking to attend a workshop that expands your skills, a concert that moves your soul, or a community gathering that introduces you to new friends, Event Explorer is your gateway to a world of possibilities.</p>
            </div>
            <div className="mission-image">
              <img src="/api/placeholder/500/300" alt="People at an event" />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="values-section">
        <div className="section-container">
          <div className="section-header">
            <h2>Our Values</h2>
            <div className="header-line"></div>
          </div>
          <div className="values-grid">
            <div className="value-card">
              <div className="value-icon">🤝</div>
              <h3>Community First</h3>
              <p>We prioritize building authentic connections and fostering inclusive spaces where everyone feels welcome.</p>
            </div>
            <div className="value-card">
              <div className="value-icon">💡</div>
              <h3>Innovation</h3>
              <p>We continuously improve our platform to provide cutting-edge tools that make organizing and discovering events effortless.</p>
            </div>
            <div className="value-card">
              <div className="value-icon">🔒</div>
              <h3>Trust & Safety</h3>
              <p>We're committed to creating a trusted environment where both organizers and attendees can connect with confidence.</p>
            </div>
            <div className="value-card">
              <div className="value-icon">🌱</div>
              <h3>Sustainability</h3>
              <p>We promote eco-friendly practices and support organizers in creating environmentally conscious events.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="section-container">
          <div className="stats-grid">
            <div className="stat-item">
              <span className="stat-number">500K+</span>
              <span className="stat-label">Active Users</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">20K+</span>
              <span className="stat-label">Event Organizers</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">100K+</span>
              <span className="stat-label">Events Hosted</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">50+</span>
              <span className="stat-label">Countries</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="section-container">
          <h2>Ready to Join Our Community?</h2>
          <p>Create an account today to start discovering events or share your own with the world.</p>
          <div className="cta-buttons">
            <button className="primary-btn">Sign Up</button>
            <button className="secondary-btn">Explore Events</button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;