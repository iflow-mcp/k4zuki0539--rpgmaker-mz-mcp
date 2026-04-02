import { readJsonFile, writeJsonFile, getDataPath } from '../utils/fileHandler.js';
/**
 * Get system data
 */
export async function getSystem(projectPath) {
    const systemPath = getDataPath(projectPath, 'System.json');
    return await readJsonFile(systemPath);
}
/**
 * Update system data
 */
export async function updateSystem(projectPath, updates) {
    const system = await getSystem(projectPath);
    const updatedSystem = { ...system, ...updates };
    const systemPath = getDataPath(projectPath, 'System.json');
    await writeJsonFile(systemPath, updatedSystem);
    return updatedSystem;
}
/**
 * Get game variables
 */
export async function getVariables(projectPath) {
    const system = await getSystem(projectPath);
    return system.variables;
}
/**
 * Set a variable name
 */
export async function setVariableName(projectPath, variableId, name) {
    const system = await getSystem(projectPath);
    system.variables[variableId] = name;
    const systemPath = getDataPath(projectPath, 'System.json');
    await writeJsonFile(systemPath, system);
}
/**
 * Get game switches
 */
export async function getSwitches(projectPath) {
    const system = await getSystem(projectPath);
    return system.switches;
}
/**
 * Set a switch name
 */
export async function setSwitchName(projectPath, switchId, name) {
    const system = await getSystem(projectPath);
    system.switches[switchId] = name;
    const systemPath = getDataPath(projectPath, 'System.json');
    await writeJsonFile(systemPath, system);
}
/**
 * Get party members
 */
export async function getPartyMembers(projectPath) {
    const system = await getSystem(projectPath);
    return system.partyMembers;
}
/**
 * Update party members
 */
export async function updatePartyMembers(projectPath, partyMembers) {
    const system = await getSystem(projectPath);
    system.partyMembers = partyMembers;
    const systemPath = getDataPath(projectPath, 'System.json');
    await writeJsonFile(systemPath, system);
}
/**
 * Get starting position
 */
export async function getStartingPosition(projectPath) {
    const system = await getSystem(projectPath);
    return {
        mapId: system.startMapId,
        x: system.startX,
        y: system.startY
    };
}
/**
 * Update starting position
 */
export async function updateStartingPosition(projectPath, mapId, x, y) {
    const system = await getSystem(projectPath);
    system.startMapId = mapId;
    system.startX = x;
    system.startY = y;
    const systemPath = getDataPath(projectPath, 'System.json');
    await writeJsonFile(systemPath, system);
}
/**
 * Get game title
 */
export async function getGameTitle(projectPath) {
    const system = await getSystem(projectPath);
    return system.gameTitle;
}
/**
 * Update game title
 */
export async function updateGameTitle(projectPath, title) {
    const system = await getSystem(projectPath);
    system.gameTitle = title;
    const systemPath = getDataPath(projectPath, 'System.json');
    await writeJsonFile(systemPath, system);
}
/**
 * Get all terms (vocabulary)
 */
export async function getTerms(projectPath) {
    const system = await getSystem(projectPath);
    return system.terms;
}
/**
 * Update a basic term
 */
export async function updateBasicTerm(projectPath, index, value) {
    const system = await getSystem(projectPath);
    system.terms.basic[index] = value;
    const systemPath = getDataPath(projectPath, 'System.json');
    await writeJsonFile(systemPath, system);
}
/**
 * Update a command term
 */
export async function updateCommandTerm(projectPath, index, value) {
    const system = await getSystem(projectPath);
    system.terms.commands[index] = value;
    const systemPath = getDataPath(projectPath, 'System.json');
    await writeJsonFile(systemPath, system);
}
//# sourceMappingURL=systemTools.js.map