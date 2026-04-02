import { readJsonFile, writeJsonFile, getDataPath } from '../utils/fileHandler.js';
/**
 * Get all actors from the project
 */
export async function getActors(projectPath) {
    const actorsPath = getDataPath(projectPath, 'Actors.json');
    return await readJsonFile(actorsPath);
}
/**
 * Get a specific actor by ID
 */
export async function getActor(projectPath, actorId) {
    const actors = await getActors(projectPath);
    return actors.find(actor => actor && actor.id === actorId) || null;
}
/**
 * Update an actor's data
 */
export async function updateActor(projectPath, actorId, updates) {
    const actors = await getActors(projectPath);
    const actorIndex = actors.findIndex(actor => actor && actor.id === actorId);
    if (actorIndex === -1) {
        throw new Error(`Actor with ID ${actorId} not found`);
    }
    actors[actorIndex] = { ...actors[actorIndex], ...updates };
    const actorsPath = getDataPath(projectPath, 'Actors.json');
    await writeJsonFile(actorsPath, actors);
    return actors[actorIndex];
}
/**
 * Create a new actor
 */
export async function createActor(projectPath, actorData) {
    const actors = await getActors(projectPath);
    // Find the next available ID
    const maxId = actors.reduce((max, actor) => {
        return actor && actor.id > max ? actor.id : max;
    }, 0);
    const newActor = {
        id: maxId + 1,
        ...actorData
    };
    actors.push(newActor);
    const actorsPath = getDataPath(projectPath, 'Actors.json');
    await writeJsonFile(actorsPath, actors);
    return newActor;
}
/**
 * Delete an actor
 */
export async function deleteActor(projectPath, actorId) {
    const actors = await getActors(projectPath);
    const actorIndex = actors.findIndex(actor => actor && actor.id === actorId);
    if (actorIndex === -1) {
        return false;
    }
    actors[actorIndex] = null;
    const actorsPath = getDataPath(projectPath, 'Actors.json');
    await writeJsonFile(actorsPath, actors);
    return true;
}
/**
 * Search actors by name
 */
export async function searchActors(projectPath, searchTerm) {
    const actors = await getActors(projectPath);
    const lowerSearchTerm = searchTerm.toLowerCase();
    return actors.filter(actor => actor && (actor.name.toLowerCase().includes(lowerSearchTerm) ||
        actor.nickname.toLowerCase().includes(lowerSearchTerm)));
}
//# sourceMappingURL=actorTools.js.map