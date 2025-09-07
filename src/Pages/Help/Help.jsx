import React, { useState } from "react";
import { Search, Heart, Mail, MessageCircle, Phone, ChevronDown, ChevronUp } from 'lucide-react';
import './Help.css';

const HelpSection = ({ title, icon: Icon, children }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div className="help-section">
            <div className="section-header" onClick={() => setIsExpanded(!isExpanded)}>
                <h2>
                    {Icon && <Icon className="section-icon"></Icon>}
                    {title}
                </h2>
                {isExpanded ? <ChevronUp/> : <ChevronDown/>}
            </div>
            <div className={`section-content ${isExpanded ? 'expanded' : ''}`}>
                {children}
            </div>
        </div>
    );
};

const Help = () => {
    return (
        <div className="help-container">
            <header className="help-header">
                <h1>Help & Support - Event Explorer Platform</h1>
                <p>Find answers to common questions and learn how to use our features</p>
            </header>

            <main className="help-content">
                <HelpSection title="1. Getting Started" icon={Heart}>
                    <div className="feature-grid">
                        <div className="feature-card">
                            <h3>What is Eventure</h3>
                            <p>The Eventure helps users discover explore concerts, sports, and theater shows using Tickertmaster API.</p>
                        </div>
                        <div className="feature-card">
                            <h3>How do I sign up?</h3>
                            <ol>
                                <li>Click the <strong>Sign Up</strong> button on the homepage</li>
                                <li>Enter your email, username, and password</li>
                                <li>Verify your email and log in using your credential</li>
                            </ol>
                        </div>
                    </div>
                </HelpSection>

                <HelpSection title="2. Finding Events" icon={Search}>
                    <h3>Search & Filter</h3>
                    <ul className="checklist">
                        <li>Use the Search Bar on the homepage</li>
                        <li>Filter by location, date, category</li>
                        <li>Sort by popularity, date, or price</li>
                        <li>Save your search preferences</li>
                    </ul>
                </HelpSection>

                <HelpSection title="3. Managing Favorites" icon={Search}>
                    <div className="info-box">
                        <h3>Favourite Features</h3>
                        <ul className="checklist">
                            <li>Click the Star icon on any events</li>
                            <li>Go to the Favourite Page to view your Favourite Events</li>
                        </ul>
                    </div>
                </HelpSection>

                <section className="support-section">
                    <h2>Need More Help?</h2>
                    <div className="support-grid">
                        <div className="support-card">
                        <Mail className="support-icon" />
                        <div>
                            <h3>Email Support</h3>
                            <p>support@eventexplorer.com</p>
                            <span>24/7 Response</span>
                        </div>
                        </div>
                        <div className="support-card">
                        <MessageCircle className="support-icon" />
                        <div>
                            <h3>Live Chat</h3>
                            <p>9 AM – 6 PM (Mon-Fri)</p>
                            <span>Typical response: 5 mins</span>
                        </div>
                        </div>
                        <div className="support-card">
                        <Phone className="support-icon" />
                        <div>
                            <h3>Phone Support</h3>
                            <p>+1-800-123-4567</p>
                            <span>Available 24/7</span>
                        </div>
                        </div>
                    </div>
                </section>
            </main>

            <footer className="help-footer">
                <div className="footer-links">
                <a href="/privacy">Privacy Policy</a>
                <a href="/terms">Terms of Service</a>
                <a href="/faq">FAQ</a>
                </div>
            </footer>
        </div>
    )
}

export default Help