'use client'

import React from 'react'
import { Film, Sparkles, Github, Twitter, Instagram, Mail, Heart } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    movies: [
      { name: 'Popular Movies', href: '#' },
      { name: 'Top Rated', href: '#' },
      { name: 'Upcoming', href: '#' },
      { name: 'Now Playing', href: '#' },
    ],
    discover: [
      { name: 'Genres', href: '#' },
      { name: 'Actors', href: '#' },
      { name: 'Directors', href: '#' },
      { name: 'Collections', href: '#' },
    ],
    company: [
      { name: 'About Us', href: '#' },
      { name: 'Contact', href: '#' },
      { name: 'Privacy Policy', href: '#' },
      { name: 'Terms of Service', href: '#' },
    ],
  };

  const socialLinks = [
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Github, href: '#', label: 'Github' },
    { icon: Mail, href: '#', label: 'Email' },
  ];

  return (
    <footer className='border-t border-(--color-border)/40 bg-card/50 backdrop-blur-md mt-auto'>
      <div className='container mx-auto px-4 lg:px-6 py-12 lg:py-16'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12'>
          {/* Brand Section */}
          <div className='lg:col-span-2'>
            <div className="flex items-center gap-3 mb-4">
              <div className="relative">
                <Film className="w-8 h-8 text-(--color-primary)" />
                <Sparkles className="w-3 h-3 text-accent absolute -top-1 -right-1" />
              </div>
              <h2 className="text-2xl font-bold bg-gradient-to-br from-foreground via-primary to-accent bg-clip-text text-transparent">
                SilverScreen
              </h2>
            </div>
            <p className='text-sm text-secondary-text leading-relaxed mb-6 max-w-sm'>
              Your ultimate destination for discovering movies, exploring genres, and staying updated with the latest in cinema. Dive into the world of entertainment.
            </p>
            
            {/* Social Links */}
            <div className='flex items-center gap-3'>
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className='w-10 h-10 rounded-full border border-(--color-border)/60 flex items-center justify-center text-(--color-muted) hover:text-accent hover:border-accent hover:bg-accent/10 transition-all duration-200'
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Movies Links */}
          <div>
            <h3 className='text-sm font-semibold text-foreground mb-4 uppercase tracking-wider'>
              Movies
            </h3>
            <ul className='space-y-3'>
              {footerLinks.movies.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className='text-sm text-secondary-text hover:text-accent transition-colors duration-200'
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Discover Links */}
          <div>
            <h3 className='text-sm font-semibold text-foreground mb-4 uppercase tracking-wider'>
              Discover
            </h3>
            <ul className='space-y-3'>
              {footerLinks.discover.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className='text-sm text-secondary-text hover:text-accent transition-colors duration-200'
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className='text-sm font-semibold text-foreground mb-4 uppercase tracking-wider'>
              Company
            </h3>
            <ul className='space-y-3'>
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className='text-sm text-secondary-text hover:text-accent transition-colors duration-200'
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className='mt-12 pt-8 border-t border-(--color-border)/40'>
          <div className='flex flex-col md:flex-row items-center justify-between gap-4'>
            <p className='text-sm text-secondary-text text-center md:text-left'>
              © {currentYear} SilverScreen. All rights reserved.
            </p>
            <p className='text-sm text-secondary-text flex items-center gap-1'>
              Made with <Heart className="w-4 h-4 text-red-500 fill-red-500" /> for movie lovers
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer