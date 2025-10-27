'use client';

import { configs } from '@/configs/configs';
import ReactGA from 'react-ga4';

export const initGA = () => {
    if (typeof window !== 'undefined' && process.env.NODE_ENV === 'production') {
        ReactGA.initialize(configs.gaMeasurementId);

        ReactGA.send({
            hitType: 'pageview',
            page: window.location.pathname + window.location.search
        });
    }
};

export const trackSectionView = (sectionName: string) => {
    if (typeof window !== 'undefined' && process.env.NODE_ENV === 'production') {
        ReactGA.event({
            category: 'Section View',
            action: `Viewed ${sectionName}`,
            label: window.location.pathname
        });
    }
};

export const trackEvent = (category: string, action: string, label?: string) => {
    if (typeof window !== 'undefined' && process.env.NODE_ENV === 'production') {
        ReactGA.event({
            category,
            action,
            label
        });
    }
};