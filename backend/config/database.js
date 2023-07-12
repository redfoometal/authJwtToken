import { Sequelize } from 'sequelize';

const {DATABASE_NAME, DATABASE_USER, DATABASE_PASS} = process.env;
const sequelize = new Sequelize(DATABASE_NAME, DATABASE_USER, DATABASE_PASS,{
    dialect: 'mysql',
    logging: false
})

export async function connect(){
    try {
        await sequelize.authenticate()
        console.log('Соединение с БД было успешно установлено')
      } catch (e) {
        console.log('Невозможно выполнить подключение к БД: ', e)
      }
}
