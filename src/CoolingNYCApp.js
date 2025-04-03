// Cooling NYC Full App Preview
import React, { useState, useEffect } from "react";

const CoolingNYCApp = () => {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({});
  const [localData, setLocalData] = useState({});

  useEffect(() => {
    // Load local JSON data once
    Promise.all([
      fetch("/cooling_centers.json").then(res => res.json()),
      fetch("/retailers.json").then(res => res.json()),
      fetch("/legal_clinics.json").then(res => res.json()),
      fetch("/advocacy_orgs.json").then(res => res.json())
    ]).then(([centers, retailers, legal, advocacy]) => {
      setLocalData({ centers, retailers, legal, advocacy });
    });
  }, []);

  const handleChange = (field, value) => setFormData(prev => ({ ...prev, [field]: value }));
  const handleNext = () => setStep(prev => prev + 1);
  const handleBack = () => setStep(prev => prev - 1);

  const steps = [
    () => <TextInput title="🌐 Preferred Language?" field="language" options={["English", "Spanish", "Chinese", "Bengali", "Russian"]} />, 
    () => <TextField title="What’s your name?" field="name" />,
    () => <TextField title="Your age?" field="age" type="number" />, 
    () => <TextField title="Indoor temperature?" field="temperature" type="number" withUnit fieldUnit="temperatureUnit" />, 
    () => <><TextField title="ZIP Code" field="zip" /><TextField title="Full Address (Optional)" field="address" /></>, 
    () => <TextInput title="Income Level?" field="income" options={["<$20,000", "$20,000–$40,000", "$40,000–$60,000", "$60,000+"]} />,
    () => <TextInput title="Advocacy Level?" field="advocacyLevel" options={["Unit or Building", "Street or Neighborhood", "Borough or City"]} />,
    () => <TextInput title="Landlord Mediation Help?" field="landlordHelp" options={["Yes, need a letter", "No"]} />,
    () => <TextInput title="Legal Help?" field="legalHelp" options={["Pro bono", "$100–$300", "$300–$500", "$500+", "No"]} />,
    () => <FinalPlan formData={formData} data={localData} />
  ];

  function TextField({ title, field, type = "text", withUnit = false, fieldUnit }) {
    return (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-white">{title}</h2>
        <input
          type={type}
          className="w-full p-3 rounded-full bg-white text-black"
          onChange={e => handleChange(field, e.target.value)}
        />
        {withUnit && (
          <select
            className="w-full p-3 rounded-full bg-white text-black"
            onChange={e => handleChange(fieldUnit, e.target.value)}
          >
            <option value="">Unit</option>
            <option value="F">Fahrenheit</option>
            <option value="C">Celsius</option>
          </select>
        )}
      </div>
    );
  }

  function TextInput({ title, field, options }) {
    return (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-white">{title}</h2>
        <select
          className="w-full p-3 rounded-full bg-white text-black"
          onChange={e => handleChange(field, e.target.value)}
        >
          <option value="">Select an option</option>
          {options.map(opt => <option key={opt}>{opt}</option>)}
        </select>
      </div>
    );
  }

  function FinalPlan({ formData, data }) {
    const { name, zip, temperature, temperatureUnit, income, address, legalHelp, landlordHelp, advocacyLevel } = formData;
    const centers = data.centers?.[zip] || ["No data available"];
    const retailers = data.retailers?.[zip] || ["No local retailers found"];
    const clinics = data.legal?.[zip] || ["No legal clinics found"];
    const borough = zip.startsWith("100") ? "manhattan" : zip.startsWith("112") ? "brooklyn" : "queens";
    const orgs = data.advocacy?.borough?.[borough] || [];

    return (
      <div className="space-y-6 text-white">
        <h2 className="text-2xl font-bold">✅ Final Cooling Plan for {name}</h2>

        <div>
          <h3 className="font-semibold text-lg">🌡️ Temperature</h3>
          <p>Indoor temperature: {temperature}°{temperatureUnit}</p>
        </div>

        <div>
          <h3 className="font-semibold text-lg">💸 HEAP Subsidy Eligibility</h3>
          <p>{["<$20,000", "$20,000–$40,000"].includes(income)
            ? "You may qualify for the NYC HEAP subsidy."
            : "You may not qualify for HEAP, but can call 311 for assistance."}</p>
        </div>

        <div>
          <h3 className="font-semibold text-lg">🏬 Cooling Centers</h3>
          <ul className="list-disc ml-5">{centers.map((c, i) => <li key={i}>{c}</li>)}</ul>
        </div>

        <div>
          <h3 className="font-semibold text-lg">🛒 Retailers</h3>
          <ul className="list-disc ml-5">{retailers.map((r, i) => <li key={i}>{r}</li>)}</ul>
        </div>

        <div>
          <h3 className="font-semibold text-lg">📣 Advocacy Organizations</h3>
          <ul className="list-disc ml-5">{orgs.map((o, i) => <li key={i}>{o}</li>)}</ul>
        </div>

        {legalHelp && legalHelp !== "No" && (
          <div>
            <h3 className="font-semibold text-lg">⚖️ Legal Support Letter</h3>
            <textarea
              className="w-full p-4 text-black bg-gray-100"
              rows={6}
              readOnly
              value={`Dear Legal Team,\n\nI am requesting ${legalHelp} support for unsafe heat conditions at ${address || "[Your Address]"}, ZIP ${zip}.\n\nSincerely,\n${name}`}
            />
          </div>
        )}

        {landlordHelp?.startsWith("Yes") && (
          <div>
            <h3 className="font-semibold text-lg">🏢 Landlord Letter</h3>
            <textarea
              className="w-full p-4 text-black bg-gray-100"
              rows={6}
              readOnly
              value={`Dear Landlord,\n\nIndoor temperature at ${address || "[Your Address]"}, ZIP ${zip} is unsafe. Please provide cooling or respond within 48 hours.\n\nSincerely,\n${name}`}
            />
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6 min-h-screen bg-[#014421] text-white">
      <h2 className="text-center text-3xl font-bold mb-4">🧊 Cooling NYC Quiz</h2>
      <div className="w-full h-2 bg-gray-300 rounded-full overflow-hidden mb-4">
        <div
          className="h-full bg-green-600"
          style={{ width: `${(step / (steps.length - 1)) * 100}%` }}
        />
      </div>
      {steps[step]()}
      <div className="flex justify-between pt-6">
        {step > 0 && (
          <button className="px-5 py-2 bg-white text-green-800 rounded-full" onClick={handleBack}>
            Back
          </button>
        )}
        {step < steps.length - 1 && (
          <button className="px-5 py-2 bg-green-600 text-white rounded-full" onClick={handleNext}>
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default CoolingNYCApp;
