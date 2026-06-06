'use client';

import Link from 'next/link';
import { MapPin, Phone, Mail, Globe } from 'lucide-react';
import { useAuth } from '@/lib/context/AuthContext';
import { quickLinks, serviceLinks } from '@/lib/constants/footer';
import styles from './Footer.module.css';

export default function Footer() {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return null;
  }

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.grid}>
          {/* Brand */}
          <div className={styles.brand}>
            <Link href="/" className={styles.logo}>
              <span className={styles.logoMark}>BAJ</span>
              <span className={styles.logoText}>Ltd</span>
            </Link>
            <p className={styles.tagline}>
              Leading sustainable waste management in Rwanda since 2013
            </p>
            <p className={styles.values}>
              Environmental responsibility · Professionalism · Innovation · Customer focus
            </p>
          </div>

          {/* Quick links */}
          <div className={styles.column}>
            <h3 className={styles.columnTitle}>Quick links</h3>
            <ul className={styles.linkList}>
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className={styles.link}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className={styles.column}>
            <h3 className={styles.columnTitle}>Services</h3>
            <ul className={styles.linkList}>
              {serviceLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className={styles.link}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className={styles.column}>
            <h3 className={styles.columnTitle}>Contact</h3>
            <ul className={styles.contactList}>
              <li>
                <MapPin size={14} strokeWidth={1.5} />
                <span>Rwanda — Kigali — Gasabo</span>
              </li>
              <li>
                <Phone size={14} strokeWidth={1.5} />
                <span>+250 788 990 596 / 078 571 7650</span>
              </li>
              <li>
                <Mail size={14} strokeWidth={1.5} />
                <a href="mailto:info@baj.rw" className={styles.link}>info@baj.rw</a>
              </li>
              <li>
                <Globe size={14} strokeWidth={1.5} />
                <a href="https://www.baj.rw" className={styles.link}>www.baj.rw</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className={styles.bottom}>
          <p className={styles.copyright}>
            © 2026 BAJ Ltd — Waste Collection Management System
          </p>
        </div>
      </div>
    </footer>
  );
}
