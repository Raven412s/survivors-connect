// components/pages/contact-us/emergency-help.tsx
'use client';

import { cn } from "@/lib/utils";
import { useTranslations } from 'next-intl';
import { Phone, Shield, AlertTriangle, Clock } from "lucide-react";
import { useState } from 'react';

export default function EmergencyHelp({ className }: { className?: string }) {
  const t = useTranslations('ContactUsPage.EmergencyHelp');
  const [isExpanded, setIsExpanded] = useState(false);

  const emergencyContacts = [
    {
      label: t('Contacts.Primary'),
      number: "+91 99355 99333",
      available: t('Availability.24x7')
    },
    {
      label: t('Contacts.Secondary'),
      number: "+91 99355 99330", 
      available: t('Availability.24x7')
    }
  ];

  const handleEmergencyCall = (phoneNumber: string) => {
    if (confirm(t('CallConfirmation'))) {
      window.open(`tel:${phoneNumber}`, '_self');
    }
  };

  return (
    <section className={cn("w-full py-16 px-6 md:px-16 bg-red-50 dark:bg-red-900/20 border-b border-red-200 dark:border-red-800", className)}>
      <div className="max-w-6xl mx-auto">
        <div className="bg-white dark:bg-red-900/30 rounded-2xl p-8 border-2 border-red-300 dark:border-red-700 shadow-lg">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            {/* Emergency Info */}
            <div className="flex items-center gap-4 flex-1">
              <div className="p-3 bg-red-100 dark:bg-red-800/50 rounded-xl">
                <AlertTriangle className="w-8 h-8 text-red-600 dark:text-red-400" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-red-900 dark:text-red-100 mb-2">
                  {t('Title')}
                </h2>
                <p className="text-red-700 dark:text-red-300">
                  {t('Description')}
                </p>
              </div>
            </div>

            {/* Emergency Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              {emergencyContacts.map((contact, index) => (
                <button
                  key={index}
                  onClick={() => handleEmergencyCall(contact.number)}
                  className="flex items-center gap-3 px-6 py-4 bg-red-600 text-white rounded-xl font-semibold hover:bg-red-700 transition-all duration-200 transform hover:scale-105 shadow-lg"
                >
                  <Phone className="w-5 h-5" />
                  <div className="text-left">
                    <div className="text-sm font-medium">{contact.label}</div>
                    <div className="text-lg font-bold">{contact.number}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Additional Help Info */}
          <div className="mt-6 pt-6 border-t border-red-200 dark:border-red-700">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex items-center gap-2 text-red-700 dark:text-red-300 hover:text-red-800 dark:hover:text-red-200 transition-colors"
            >
              <Clock className="w-4 h-4" />
              <span className="font-medium">{t('AdditionalInfo')}</span>
            </button>
            
            {isExpanded && (
              <div className="mt-4 p-4 bg-red-100 dark:bg-red-800/30 rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-red-800 dark:text-red-200">
                  <div>
                    <h4 className="font-semibold mb-2">{t('SupportTypes.Immediate')}</h4>
                    <ul className="space-y-1">
                      <li>• {t('SupportTypes.Crisis')}</li>
                      <li>• {t('SupportTypes.Emergency')}</li>
                      <li>• {t('SupportTypes.Safety')}</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">{t('SupportTypes.FollowUp')}</h4>
                    <ul className="space-y-1">
                      <li>• {t('SupportTypes.Counseling')}</li>
                      <li>• {t('SupportTypes.Legal')}</li>
                      <li>• {t('SupportTypes.Medical')}</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Safety Notice */}
          <div className="mt-4 flex items-center gap-2 text-xs text-red-600 dark:text-red-400">
            <Shield className="w-3 h-3" />
            <span>{t('SafetyNotice')}</span>
          </div>
        </div>
      </div>
    </section>
  );
}