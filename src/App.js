import React, { useState } from 'react';
import coolingDevices from './data/coolingDevices.json';
import legalClinics from './data/legalClinics.json';
import advocacyOrgs from './data/advocacyOrgs.json';

const App = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({});
  const [language, setLanguage] = useState('English');

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
        cooling: ["Window AC Unit", "Box Fan"],
        landlord: ["Yes – generate a letter for me", "No"],
        advocacy: ["My individual unit/home", "My whole building", "My block", "My neighborhood", "My borough"],
        languages: ["English", "Español", "中文", "বাংলা", "Русский", "العربية", "Français", "Kreyòl Ayisyen", "한국어", "اردو"]
      },
      next: "Next",
      seePlan: "See My Plan",
      planHeading: "🌡️ Personalized Cooling Plan for"
    }
  };

  const t = translations[language];

  const handleNext = () => {
    setStep((s) => Math.min(s + 1, 10));
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const generateLetter = () => {
    return \`
Dear Landlord,

I am a tenant at \${formData.address || '[address]'} (\${formData.zip}).
Temperatures indoors have reached \${formData.temperature}°\${formData.tempUnit}.
I am requesting action to provide cooling in accordance with NYC tenant law.

Sincerely,
\${formData.name}
\`;
  };

  const downloadReport = () => {
    const content = document.getElementById('report')?.innerText;
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'cooling-plan.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const renderFinalPlan = () => {
    const zip = formData.zip;
    const temp = formData.temperature;
    const deviceList = coolingDevices
      .filter(d => formData[d.name])
      .map(d => \`- \${d.name} (\${d.price}) → \${d.storeUrl}\`).join('\n');

    const legalList = (legalClinics[zip] || []).map(c => \`- \${c}\`).join('\n');
    const orgList = (advocacyOrgs[zip] || []).map(o => \`- \${o}\`).join('\n');

    return (
      <div id="report" style={{ whiteSpace: 'pre-wrap', fontFamily: 'monospace', marginTop: '1rem' }}>
        <h3>🔥 Heat Warning Alert</h3>
        {temp >= 85 ? <p>🚨 Your home may be dangerously hot. NYC issues heat advisories at 85°F and above.</p> : <p>No heat warning currently based on your input.</p>}
        
        <h3>🧭 Cooling Centers</h3>
        <a href={\`https://maps.nyc.gov/cooling-center/?zip=\${zip}\`} target="_blank" rel="noreferrer">
          View Cooling Centers Near You
        </a>

        <h3>💸 Subsidy Recommendations</h3>
        {["<$20,000", "$20,000–$40,000"].includes(formData.income) && (
          <p>You may qualify for NYC’s <a href="https://access.nyc.gov/programs/cooling-assistance-benefit/" target="_blank">Cooling Assistance Benefit</a>.</p>
        )}

        <h3>🧊 Cooling Devices</h3>
        <pre>{deviceList || "No devices selected."}</pre>

        <h3>✊ Advocacy Orgs</h3>
        <pre>{orgList || "No recommendations found for your ZIP."}</pre>

        <h3>⚖️ Legal Help</h3>
        <pre>{legalList || "No legal clinics found for your ZIP."}</pre>

        <h3>📄 Landlord Letter</h3>
        <pre>{generateLetter()}</pre>

        <button onClick={downloadReport}>⬇️ Download This Plan</button>
      </div>
    );
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <>
            <select onChange={(e) => handleChange('tempUnit', e.target.value)}>
              <option value="">Select Unit</option>
              <option value="F">Fahrenheit</option>
              <option value="C">Celsius</option>
            </select>
            <input type="number" placeholder="Temperature" onChange={(e) => handleChange('temperature', e.target.value)} />
          </>
        );
      case 2:
        return <input placeholder="Full Name" onChange={(e) => handleChange('name', e.target.value)} />;
      case 3:
        return (
          <>
            <input placeholder="ZIP Code" onChange={(e) => handleChange('zip', e.target.value)} />
            <input placeholder="Street Address" onChange={(e) => handleChange('address', e.target.value)} />
          </>
        );
      case 4:
        return (
          <select onChange={(e) => handleChange('housing', e.target.value)}>
            <option value="">Select Housing Type</option>
            {t.options.housing.map(opt => <option key={opt}>{opt}</option>)}
          </select>
        );
      case 5:
        return (
          <select onChange={(e) => handleChange('income', e.target.value)}>
            <option value="">Select Income</option>
            {t.options.income.map(opt => <option key={opt}>{opt}</option>)}
          </select>
        );
      case 6:
        return (
          <>
            {t.options.cooling.map(opt => (
              <label key={opt}><input type="checkbox" onChange={(e) => handleChange(opt, e.target.checked)} /> {opt}</label>
            ))}
          </>
        );
      case 7:
        return (
          <select onChange={(e) => handleChange('landlordHelp', e.target.value)}>
            <option value="">Do you want landlord help?</option>
            {t.options.landlord.map(opt => <option key={opt}>{opt}</option>)}
          </select>
        );
      case 8:
        return (
          <select onChange={(e) => handleChange('legalHelp', e.target.value)}>
            <option value="">Do you want legal help?</option>
            <option>Yes – I need free legal support</option>
            <option>Yes – I can pay up to $100</option>
            <option>No</option>
          </select>
        );
      case 9:
        return (
          <select onChange={(e) => handleChange('advocacy', e.target.value)}>
            <option value="">How far do you want to advocate?</option>
            {t.options.advocacy.map(opt => <option key={opt}>{opt}</option>)}
          </select>
        );
      case 10:
        return renderFinalPlan();
      default:
        return null;
    }
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'Inter, sans-serif' }}>
      <h1>{t.steps[step - 1]}</h1>
      <div style={{ margin: '1rem 0' }}>
        <label>🌐 Language: </label>
        <select value={language} onChange={(e) => setLanguage(e.target.value)}>
          {t.options.languages.map(l => <option key={l}>{l}</option>)}
        </select>
      </div>
      <div>{renderStep()}</div>
      {step < 10 && (
        <button style={{ marginTop: '1rem' }} onClick={handleNext}>
          {step === 9 ? t.seePlan : t.next}
        </button>
      )}
    </div>
  );
};

export default App;