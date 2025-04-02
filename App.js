import React, { useState } from 'react';
import coolingDevices from './data/coolingDevices.json';
import legalClinics from './data/legalClinics.json';
import advocacyOrgs from './data/advocacyOrgs.json';

const App = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({});
  const [language, setLanguage] = useState('English');
  const [error, setError] = useState('');

  const translations = {
    English: {
      steps: [
        "Current Indoor Temperature",
        "Your Name",
        "ZIP Code and Address",
        "Housing Type",
        "Income Level",
        "Cooling Devices You Use or Need",
        "Landlord Help",
        "Legal Support",
        "Advocacy Level",
        "Your Personalized Cooling Plan"
      ],
      options: {
        housing: ["NYCHA/Public Housing", "Private Rental", "Owner-occupied", "Shelter or Temporary Housing"],
        income: ["<$20,000", "$20,000$40,000", "$40,000$60,000", "$60,000+"],
        cooling: ["Window AC Unit", "Box Fan"],
        landlord: ["Yes  generate a letter for me", "No"],
        advocacy: ["My unit", "My building", "My block", "My neighborhood", "My borough"],
        languages: ["English", "Espaol", "", "", "", "", "Franais", "Kreyl Ayisyen", "", ""]
      },
      next: "Next",
      seePlan: "See My Plan",
      planHeading: " Personalized Cooling Plan for"
    }
  };

  const t = translations[language];

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
      setError('Please complete all required fields.');
      return;
    }
    setError('');
    setStep((s) => Math.min(s + 1, 10));
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const generateLetter = () => {
    return \`
Dear Landlord,

I am a tenant at \${formData.address || '[address]'} (\${formData.zip}).
Temperatures indoors have reached \${formData.temperature}\${formData.tempUnit}.
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
      .map(d => \`- \${d.name} (\${d.price})  \${d.storeUrl}\`).join('\n');

    const legalList = (legalClinics[zip] || []).map(c => \`- \${c}\`).join('\n');
    const orgList = (advocacyOrgs[zip] || []).map(o => \`- \${o}\`).join('\n');

    return (
      <div id="report" style={{ whiteSpace: 'pre-wrap', fontFamily: 'monospace', marginTop: '1rem' }}>
        <h3> Heat Warning Alert</h3>
        {temp >= 85 ? <p> Your home may be dangerously hot.</p> : <p>No heat warning based on your input.</p>}

        <h3> Cooling Centers</h3>
        <a href={\`https://maps.nyc.gov/cooling-center/?zip=\${zip}\`} target="_blank" rel="noreferrer">
          Find Cooling Centers
        </a>

        <h3> Subsidy Eligibility</h3>
        {["<$20,000", "$20,000$40,000"].includes(formData.income) ? (
          <p>You may qualify for the <a href="https://access.nyc.gov/programs/cooling-assistance-benefit/" target="_blank">Cooling Assistance Benefit</a>.</p>
        ) : <p>No subsidy eligibility found.</p>}

        <h3> Cooling Devices</h3>
        <pre>{deviceList || "None selected."}</pre>

        <h3> Advocacy</h3>
        <pre>{orgList || "No recommendations found."}</pre>

        <h3> Legal Help</h3>
        <pre>{legalList || "No legal clinics found."}</pre>

        <h3> Landlord Letter</h3>
        <pre>{generateLetter()}</pre>

        <button onClick={downloadReport}> Download Plan</button>
      </div>
    );
  };

  const renderStep = () => {
    const inputStyle = { margin: '0.5rem 0', padding: '0.5rem', width: '100%' };
    switch (step) {
      case 1:
        return (
          <>
            <label>Temperature Unit:</label>
            <select style={inputStyle} onChange={(e) => handleChange('tempUnit', e.target.value)}>
              <option value="">Select</option>
              <option value="F">Fahrenheit</option>
              <option value="C">Celsius</option>
            </select>
            <input style={inputStyle} type="number" placeholder="Indoor temperature" onChange={(e) => handleChange('temperature', e.target.value)} />
          </>
        );
      case 2:
        return <input style={inputStyle} placeholder="Your name" onChange={(e) => handleChange('name', e.target.value)} />;
      case 3:
        return (
          <>
            <input style={inputStyle} placeholder="ZIP Code" onChange={(e) => handleChange('zip', e.target.value)} />
            <input style={inputStyle} placeholder="Street Address" onChange={(e) => handleChange('address', e.target.value)} />
          </>
        );
      case 4:
        return (
          <select style={inputStyle} onChange={(e) => handleChange('housing', e.target.value)}>
            <option value="">Select Housing Type</option>
            {t.options.housing.map(opt => <option key={opt}>{opt}</option>)}
          </select>
        );
      case 5:
        return (
          <select style={inputStyle} onChange={(e) => handleChange('income', e.target.value)}>
            <option value="">Select Income</option>
            {t.options.income.map(opt => <option key={opt}>{opt}</option>)}
          </select>
        );
      case 6:
        return (
          <>
            {t.options.cooling.map(opt => (
              <label key={opt} style={{ display: 'block', margin: '0.3rem 0' }}>
                <input type="checkbox" onChange={(e) => handleChange(opt, e.target.checked)} /> {opt}
              </label>
            ))}
          </>
        );
      case 7:
        return (
          <select style={inputStyle} onChange={(e) => handleChange('landlordHelp', e.target.value)}>
            <option value="">Need landlord help?</option>
            {t.options.landlord.map(opt => <option key={opt}>{opt}</option>)}
          </select>
        );
      case 8:
        return (
          <select style={inputStyle} onChange={(e) => handleChange('legalHelp', e.target.value)}>
            <option value="">Legal help options</option>
            <option>Yes  I need free legal support</option>
            <option>Yes  I can pay up to $100</option>
            <option>No</option>
          </select>
        );
      case 9:
        return (
          <select style={inputStyle} onChange={(e) => handleChange('advocacy', e.target.value)}>
            <option value="">Advocacy level</option>
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
    <div style={{ padding: '2rem', fontFamily: 'Inter, sans-serif', maxWidth: 600, margin: '0 auto' }}>
      <h2>{t.steps[step - 1]}</h2>
      <div>
         Language:
        <select style={{ marginLeft: '0.5rem' }} value={language} onChange={(e) => setLanguage(e.target.value)}>
          {t.options.languages.map(l => <option key={l}>{l}</option>)}
        </select>
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div style={{ marginTop: '1rem' }}>{renderStep()}</div>
      {step < 10 && (
        <button style={{ marginTop: '1rem', padding: '0.5rem 1rem' }} onClick={handleNext}>
          {step === 9 ? t.seePlan : t.next}
        </button>
      )}
    </div>
  );
};

export default App;