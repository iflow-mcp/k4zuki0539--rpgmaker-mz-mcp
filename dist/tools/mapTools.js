import { readJsonFile, writeJsonFile, getMapPath, getDataPath } from '../utils/fileHandler.js';
/**
 * Get map data by ID
 */
export async function getMap(projectPath, mapId) {
    const mapPath = getMapPath(projectPath, mapId);
    return await readJsonFile(mapPath);
}
/**
 * Get all map info
 */
export async function getMapInfos(projectPath) {
    const mapInfosPath = getDataPath(projectPath, 'MapInfos.json');
    return await readJsonFile(mapInfosPath);
}
/**
 * Update map properties
 */
export async function updateMap(projectPath, mapId, updates) {
    const map = await getMap(projectPath, mapId);
    const updatedMap = { ...map, ...updates };
    const mapPath = getMapPath(projectPath, mapId);
    await writeJsonFile(mapPath, updatedMap);
    return updatedMap;
}
/**
 * Get events from a specific map
 */
export async function getMapEvents(projectPath, mapId) {
    const map = await getMap(projectPath, mapId);
    return map.events;
}
/**
 * Get a specific event from a map
 */
export async function getMapEvent(projectPath, mapId, eventId) {
    const events = await getMapEvents(projectPath, mapId);
    return events[eventId] || null;
}
/**
 * Update a map event
 */
export async function updateMapEvent(projectPath, mapId, eventId, updates) {
    const map = await getMap(projectPath, mapId);
    if (!map.events[eventId]) {
        throw new Error(`Event ${eventId} not found on map ${mapId}`);
    }
    map.events[eventId] = { ...map.events[eventId], ...updates };
    const mapPath = getMapPath(projectPath, mapId);
    await writeJsonFile(mapPath, map);
    return map.events[eventId];
}
/**
 * Create a new event on a map
 */
export async function createMapEvent(projectPath, mapId, eventData) {
    const map = await getMap(projectPath, mapId);
    // Find the next available event ID
    const maxId = map.events.reduce((max, event, index) => {
        return event && index > max ? index : max;
    }, 0);
    const newEvent = {
        id: maxId + 1,
        ...eventData
    };
    map.events[maxId + 1] = newEvent;
    const mapPath = getMapPath(projectPath, mapId);
    await writeJsonFile(mapPath, map);
    return newEvent;
}
/**
 * Delete an event from a map
 */
export async function deleteMapEvent(projectPath, mapId, eventId) {
    const map = await getMap(projectPath, mapId);
    if (!map.events[eventId]) {
        return false;
    }
    map.events[eventId] = null;
    const mapPath = getMapPath(projectPath, mapId);
    await writeJsonFile(mapPath, map);
    return true;
}
/**
 * Search events by name
 */
export async function searchMapEvents(projectPath, mapId, searchTerm) {
    const events = await getMapEvents(projectPath, mapId);
    const lowerSearchTerm = searchTerm.toLowerCase();
    return events.filter(event => event && event.name.toLowerCase().includes(lowerSearchTerm));
}
/**
 * Add a command to an event page
 */
export async function addEventCommand(projectPath, mapId, eventId, pageIndex, command, position) {
    const map = await getMap(projectPath, mapId);
    if (!map.events[eventId]) {
        throw new Error(`Event ${eventId} not found on map ${mapId}`);
    }
    const event = map.events[eventId];
    if (!event.pages[pageIndex]) {
        throw new Error(`Page ${pageIndex} not found on event ${eventId}`);
    }
    const commandList = event.pages[pageIndex].list;
    if (position !== undefined && position >= 0 && position < commandList.length - 1) {
        // Insert at specific position (before the end command)
        commandList.splice(position, 0, command);
    }
    else {
        // Add before the end command (code 0)
        commandList.splice(commandList.length - 1, 0, command);
    }
    const mapPath = getMapPath(projectPath, mapId);
    await writeJsonFile(mapPath, map);
    return event;
}
/**
 * Get map dimensions
 */
export async function getMapDimensions(projectPath, mapId) {
    const map = await getMap(projectPath, mapId);
    return {
        width: map.width,
        height: map.height
    };
}
/**
 * Set map tile at specific position
 */
export async function setMapTile(projectPath, mapId, x, y, layer, tileId) {
    const map = await getMap(projectPath, mapId);
    if (x < 0 || x >= map.width || y < 0 || y >= map.height) {
        throw new Error(`Position (${x}, ${y}) is out of map bounds`);
    }
    // RPG Maker MZ stores tiles in a 1D array with 6 layers
    // Index = (layer * height + y) * width + x
    const index = (layer * map.height + y) * map.width + x;
    map.data[index] = tileId;
    const mapPath = getMapPath(projectPath, mapId);
    await writeJsonFile(mapPath, map);
}
//# sourceMappingURL=mapTools.js.map