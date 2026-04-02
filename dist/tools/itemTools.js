import { readJsonFile, writeJsonFile, getDataPath } from '../utils/fileHandler.js';
/**
 * Get all items from the project
 */
export async function getItems(projectPath) {
    const itemsPath = getDataPath(projectPath, 'Items.json');
    return await readJsonFile(itemsPath);
}
/**
 * Get all weapons from the project
 */
export async function getWeapons(projectPath) {
    const weaponsPath = getDataPath(projectPath, 'Weapons.json');
    return await readJsonFile(weaponsPath);
}
/**
 * Get all armors from the project
 */
export async function getArmors(projectPath) {
    const armorsPath = getDataPath(projectPath, 'Armors.json');
    return await readJsonFile(armorsPath);
}
/**
 * Get all skills from the project
 */
export async function getSkills(projectPath) {
    const skillsPath = getDataPath(projectPath, 'Skills.json');
    return await readJsonFile(skillsPath);
}
/**
 * Get a specific item by ID
 */
export async function getItem(projectPath, itemId) {
    const items = await getItems(projectPath);
    return items.find(item => item && item.id === itemId) || null;
}
/**
 * Update an item's data
 */
export async function updateItem(projectPath, itemId, updates) {
    const items = await getItems(projectPath);
    const itemIndex = items.findIndex(item => item && item.id === itemId);
    if (itemIndex === -1) {
        throw new Error(`Item with ID ${itemId} not found`);
    }
    items[itemIndex] = { ...items[itemIndex], ...updates };
    const itemsPath = getDataPath(projectPath, 'Items.json');
    await writeJsonFile(itemsPath, items);
    return items[itemIndex];
}
/**
 * Create a new item
 */
export async function createItem(projectPath, itemData) {
    const items = await getItems(projectPath);
    const maxId = items.reduce((max, item) => {
        return item && item.id > max ? item.id : max;
    }, 0);
    const newItem = {
        id: maxId + 1,
        ...itemData
    };
    items.push(newItem);
    const itemsPath = getDataPath(projectPath, 'Items.json');
    await writeJsonFile(itemsPath, items);
    return newItem;
}
/**
 * Update a weapon's data
 */
export async function updateWeapon(projectPath, weaponId, updates) {
    const weapons = await getWeapons(projectPath);
    const weaponIndex = weapons.findIndex(weapon => weapon && weapon.id === weaponId);
    if (weaponIndex === -1) {
        throw new Error(`Weapon with ID ${weaponId} not found`);
    }
    weapons[weaponIndex] = { ...weapons[weaponIndex], ...updates };
    const weaponsPath = getDataPath(projectPath, 'Weapons.json');
    await writeJsonFile(weaponsPath, weapons);
    return weapons[weaponIndex];
}
/**
 * Update an armor's data
 */
export async function updateArmor(projectPath, armorId, updates) {
    const armors = await getArmors(projectPath);
    const armorIndex = armors.findIndex(armor => armor && armor.id === armorId);
    if (armorIndex === -1) {
        throw new Error(`Armor with ID ${armorId} not found`);
    }
    armors[armorIndex] = { ...armors[armorIndex], ...updates };
    const armorsPath = getDataPath(projectPath, 'Armors.json');
    await writeJsonFile(armorsPath, armors);
    return armors[armorIndex];
}
/**
 * Update a skill's data
 */
export async function updateSkill(projectPath, skillId, updates) {
    const skills = await getSkills(projectPath);
    const skillIndex = skills.findIndex(skill => skill && skill.id === skillId);
    if (skillIndex === -1) {
        throw new Error(`Skill with ID ${skillId} not found`);
    }
    skills[skillIndex] = { ...skills[skillIndex], ...updates };
    const skillsPath = getDataPath(projectPath, 'Skills.json');
    await writeJsonFile(skillsPath, skills);
    return skills[skillIndex];
}
/**
 * Search items by name or description
 */
export async function searchItems(projectPath, searchTerm) {
    const items = await getItems(projectPath);
    const lowerSearchTerm = searchTerm.toLowerCase();
    return items.filter(item => item && (item.name.toLowerCase().includes(lowerSearchTerm) ||
        item.description.toLowerCase().includes(lowerSearchTerm)));
}
//# sourceMappingURL=itemTools.js.map