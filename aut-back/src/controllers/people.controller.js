import { People } from '../model/people.model.js';
import { sequelize } from '../database/database.config.js';
import { Op } from 'sequelize';

export async function getPeople(req, res) {
    try {
        const people = await People.findAll();
        res.json(people);
    } catch (error) {
        res.status(500).json({ message: 'Error getting people', error: error.message });
    }
}

export async function searchPeopleForName(req, res) {
  try {
      const { query } = req.query;
      const queryLower = query.toLowerCase();
    
      const peopleStartsWithQuery = await People.findAll({
        where: sequelize.where(sequelize.fn('LOWER', sequelize.col('nombre_contacto')), {
          [Op.like]: `${queryLower}%`  
        }),
        order: [
          sequelize.literal(`LOWER(nombre_contacto) LIKE '${queryLower}%' DESC`)
        ]
      });
    
      const peopleContainsQuery = await People.findAll({
        where: {
          [Op.and]: [
            sequelize.where(sequelize.fn('LOWER', sequelize.col('nombre_contacto')), {
              [Op.notLike]: `${queryLower}%`
            }),
            sequelize.where(sequelize.fn('LOWER', sequelize.col('nombre_contacto')), {
              [Op.like]: `%${queryLower}%`
            })
          ]
        },
        order: [
          sequelize.literal(`LOWER(nombre_contacto) LIKE '%${queryLower}%' DESC`)
        ]
      });
    
      const people = [...peopleStartsWithQuery, ...peopleContainsQuery];

      if (people.length === 0) {
        res.status(404).json({ message: 'No results found' });
      } else {
        res.json(people);
      }
  
  } catch (error) {
      res.status(500).json({ message: 'Error searching people', error: error.message });
  }
}

export async function searchPeopleForEmail(req, res) {
  try {
      const { query } = req.query;
      const queryLower = query.toLowerCase();
    
      const peopleStartsWithQuery = await People.findAll({
        where: sequelize.where(sequelize.fn('LOWER', sequelize.col('correo')), {
          [Op.like]: `${queryLower}%`  
        }),
        order: [
          sequelize.literal(`LOWER(correo) LIKE '${queryLower}%' DESC`)
        ]
      });
    
      const peopleContainsQuery = await People.findAll({
        where: {
          [Op.and]: [
            sequelize.where(sequelize.fn('LOWER', sequelize.col('correo')), {
              [Op.notLike]: `${queryLower}%`
            }),
            sequelize.where(sequelize.fn('LOWER', sequelize.col('correo')), {
              [Op.like]: `%${queryLower}%`
            })
          ]
        },
        order: [
          sequelize.literal(`LOWER(correo) LIKE '%${queryLower}%' DESC`)
        ]
      });
    
      const people = [...peopleStartsWithQuery, ...peopleContainsQuery];

      if (people.length === 0) {
        res.status(404).json({ message: 'No results found' });
      } else {
        res.json(people);
      }
  
  } catch (error) {
      res.status(500).json({ message: 'Error searching people', error: error.message });
  }
}