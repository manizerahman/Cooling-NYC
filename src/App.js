// TaskRabbit-style UI for Cooling Quiz
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

const App = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({});
  const [language, setLanguage] = useState('English');

  const handleNext = () => {
    const requiredFields = {
      1: ['tempUnit', 'temperature'],
      2: ['name'],
      3: ['zip'],
      4: ['housing'],
      5: ['income'],
      7: ['landlordHelp'],
      8: ['legalHelp'],
      9: ['advocacy']
    };
    const currentRequired = requiredFields[step] || [];
    const missing = currentRequired.filter((key) => !formData[key]);
    if (missing.length > 0) {
      alert(`Please complete all required fields before continuing.`);
      return;
    }
    setStep((s) => Math.min(s + 1, 10));
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const translations = {
    English: {
      steps: [
        "Current Indoor Temperature (°F or °C)",
        "What's your name?",
        "Your ZIP Code and Address",
        "Your Housing Type",
        "Your Income",
        "Cooling Options",
        "Landlord Help",
        "Would you like legal support and what can you afford?",
        "Your Advocacy Level",
        "Your Personalized Cooling Plan"
      ],
      options: {
        housing: ["NYCHA/Public Housing", "Private Rental", "Owner-occupied", "Shelter or Temporary Housing"],
        income: ["<$20,000", "$20,000–$40,000", "$40,000–$60,000", "$60,000+"],
        cooling: ["Window AC", "Fan", "Heat Pump", "Evaporative Cooler", "Ceiling Fan", "Dehumidifier", "Natural Ventilation"],
        landlord: ["Yes – generate a letter for me", "No"],
        advocacy: ["My individual unit/home", "My whole building", "My street or block", "My neighborhood", "The entire borough"],
        languages: ["English", "Español", "中文", "বাংলা", "Русский", "العربية", "Français", "Kreyòl Ayisyen", "한국어", "اردو"]
      },
      next: "Next",
      seePlan: "See My Plan",
      planHeading: "🌡️ Personalized Cooling Plan for"
    }
  };

  const t = translations[language];
  const zip = formData.zip || '[ZIP]';
  const address = formData.address || '[your address]';
  const temp = formData.temperature || '[temperature]';
  const unit = formData.tempUnit || '';
  const income = formData.income || '[income]';
  const name = formData.name || '[Name]';

  const generatePlan = () => {
    const plan = [];

    if (formData.income === '<$20,000' || formData.income === '$20,000–$40,000') {
      plan.push('💸 You may qualify for the NYC Cooling Assistance Benefit. Visit: https://access.nyc.gov/programs/cooling-assistance-benefit/');
    }

    if (formData.housing === 'NYCHA/Public Housing') {
      plan.push('🏢 Contact NYCHA maintenance for AC installations. You may also request cooling support through your housing assistant.');
    }

    if (formData.landlordHelp?.includes('generate a letter')) {
      plan.push('📄 Use this tool to generate a landlord letter demanding adequate cooling: [Insert Landlord Letter Generator Link]');
    }

    if (formData.legalHelp?.includes('free')) {
      plan.push('⚖️ Reach out to Legal Aid NYC for tenant cooling rights support: https://www.legalaidnyc.org');
    }

    if (formData.advocacy === 'My neighborhood' || formData.advocacy === 'The entire borough') {
      plan.push('📣 Join your local community board or environmental justice organization to advocate for equitable cooling zones.');
    }

    plan.push(`📍 Based on ZIP code ${zip}, you can also check community cooling centers during heat emergencies here: https://maps.nyc.gov/cooling-center/`);

    return plan;
  };

  const stepContentStyle = "rounded-2xl p-6 bg-white shadow-xl mb-6 border border-gray-200";

  return (
    <div className="max-w-md mx-auto px-4 py-8 font-sans bg-gray-50 min-h-screen">
      <div className="mb-6">
        <label className="block text-sm font-semibold text-gray-700 mb-2">🌐 Language</label>
        <select className="w-full p-3 border border-gray-300 rounded-lg shadow-sm" onChange={(e) => setLanguage(e.target.value)} value={language}>
          {t.options.languages.map((lang) => (
            <option key={lang} value={lang}>{lang}</option>
          ))}
        </select>
      </div>

      <div className="relative w-full h-2 bg-gray-200 rounded-full overflow-hidden mb-6">
        <div className="absolute top-0 left-0 h-full bg-green-500 transition-all duration-300" style={{ width: `${(step / 10) * 100}%` }}></div>
      </div>

      <div className={stepContentStyle}>
        <h2 className="text-lg font-bold text-gray-800 mb-4">{t.steps[step - 1]}</h2>

        {step === 10 && (
          <div className="space-y-4">
            <p><strong>{t.planHeading} {name}</strong></p>
            <p>📍 ZIP Code: {zip}</p>
            <p>📫 Address: {address}</p>
            <p>🌡️ Indoor Temp: {temp}°{unit}</p>
            <p>🏠 Housing: {formData.housing}</p>
            <p>💰 Income: {income}</p>
            <p>🧊 Cooling Options: {t.options.cooling.filter((option) => formData[option]).join(', ') || 'Not selected'}</p>
            <p>📞 Landlord Help: {formData.landlordHelp}</p>
            <p>⚖️ Legal Help: {formData.legalHelp}</p>
            <p>📣 Advocacy: {formData.advocacy}</p>

            <div className="mt-6">
              <h3 className="text-md font-semibold text-gray-800 mb-2">🔍 Recommendations</h3>
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                {generatePlan().map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;