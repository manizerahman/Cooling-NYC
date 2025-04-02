import React, { useState } from 'react';

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
      alert('Please complete all required fields before continuing.');
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

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <>
            <select onChange={(e) => handleChange('tempUnit', e.target.value)}>
              <option value="">Select Unit</option>
              <option value="Fahrenheit">Fahrenheit (°F)</option>
              <option value="Celsius">Celsius (°C)</option>
            </select>
            <input placeholder="Enter temperature" onChange={(e) => handleChange('temperature', e.target.value)} />
          </>
        );
      case 2:
        return <input placeholder="Your full name" onChange={(e) => handleChange('name', e.target.value)} />;
      case 3:
        return (
          <>
            <input placeholder="ZIP Code" onChange={(e) => handleChange('zip', e.target.value)} />
            <input placeholder="Street Address (optional)" onChange={(e) => handleChange('address', e.target.value)} />
          </>
        );
      case 4:
        return (
          <select onChange={(e) => handleChange('housing', e.target.value)}>
            <option value="">Select Housing Type</option>
            {t.options.housing.map((opt) => <option key={opt}>{opt}</option>)}
          </select>
        );
      case 5:
        return (
          <select onChange={(e) => handleChange('income', e.target.value)}>
            <option value="">Select Income Range</option>
            {t.options.income.map((opt) => <option key={opt}>{opt}</option>)}
          </select>
        );
      case 6:
        return (
          <div>
            {t.options.cooling.map((option) => (
              <label key={option}>
                <input type="checkbox" onChange={(e) => handleChange(option, e.target.checked)} />
                {option}
              </label>
            ))}
          </div>
        );
      case 7:
        return (
          <select onChange={(e) => handleChange('landlordHelp', e.target.value)}>
            <option value="">Need help contacting your landlord?</option>
            {t.options.landlord.map((opt) => <option key={opt}>{opt}</option>)}
          </select>
        );
      case 8:
        return (
          <select onChange={(e) => handleChange('legalHelp', e.target.value)}>
            <option value="">Would you like legal help?</option>
            <option>Yes – I need free legal support</option>
            <option>Yes – I can pay up to $100</option>
            <option>No</option>
          </select>
        );
      case 9:
        return (
          <select onChange={(e) => handleChange('advocacy', e.target.value)}>
            <option value="">How far do you want to advocate?</option>
            {t.options.advocacy.map((opt) => <option key={opt}>{opt}</option>)}
          </select>
        );
      case 10:
        return (
          <div>
            <h2>{t.planHeading} {name}</h2>
            <ul>
              {generatePlan().map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>{t.steps[step - 1]}</h1>
      {renderStep()}
      {step < 10 && (
        <button onClick={handleNext} style={{ marginTop: '1rem' }}>
          {step === 9 ? t.seePlan : t.next}
        </button>
      )}
    </div>
  );
};

export default App;