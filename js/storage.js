

const STORAGE_KEY = 'prepMasterData_v3';

export function saveToStorage(data) {
    try {
        const payload = JSON.stringify({
            schema: 3.2,
            tasks: data.tasks,
            subjects: data.subjects,
            targetDate: data.targetDate,
            lastBackup: data.lastBackup
        });
        localStorage.setItem(STORAGE_KEY, payload);
        return true;
    } catch (e) {
        console.error("Save failed:", e);
        return false;
    }
}


export function loadFromStorage() {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return null;

    try {
        return JSON.parse(stored);
    } catch (e) {
        console.error("Data corrupted, backing up and resetting.", e);
        localStorage.setItem(STORAGE_KEY + '_corrupted', stored);
        return null;
    }
}



export function validateData(data) {
    if (!data || typeof data !== 'object') return { ok: false, error: "Invalid JSON structure." };
    if (data.schema !== 3.2) return { ok: false, error: `Version mismatch. Expected 3.2, got ${data.schema}.` };
    if (!Array.isArray(data.tasks)) return { ok: false, error: "Missing tasks array." };
    if (!Array.isArray(data.subjects)) return { ok: false, error: "Missing subjects array." };
    return { ok: true };
}