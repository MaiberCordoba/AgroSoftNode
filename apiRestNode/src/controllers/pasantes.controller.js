import pool from '../db.js';

export async function getAll(req,res){
    try{
        const sql = 'SELECT * FROM Pasantes';
        const [pasantes] = await pool.query(sql);
        res.status(200).json(pasantes);
    }
    catch(error){
        console.error(error);
        res.status(500).json({msg:"Internal server error"});
    }
}

export async function create(req,res){
    try{
        const sql = 'INSERT INTO Pasantes(fk_Usuarios, fechaInicioPasantia, fechaFinalizacion, salarioHora, area) VALUES (?,?,?,?,?)';
        const {
            fk_Usuarios,
            fechaInicioPasantia,
            fechaFinalizacion,
            salarioHora,
            area
        } = req.body;
        const [result] = await pool.query(sql,[fk_Usuarios,fechaInicioPasantia,fechaFinalizacion,salarioHora,area]);
        if(result.affectedRows > 0){
            return res.status(201).json({msg:"Pasante created successfully"});
        }
        res.status(400).json({msg:"Error creating Pasante"});
    }
    catch(error){
        console.error(error);
        res.status(500).json({msg:"Internal server error"});
    }
}

export async function regHoras(req,res){
    try{
        const { fk_Pasantes, minutos, mes } = req.body;
        const [[pasante]] = await pool.query('SELECT * FROM Pasantes WHERE id = ?',fk_Pasantes);
        const salario = (minutos/60) * pasante.salarioHora;
        const sql = 'INSERT INTO horasmensuales(fk_Pasantes,minutos,salario,mes) VALUES (?,?,?,?)';
        const [result] = await pool.query(sql,[fk_Pasantes,minutos,salario,mes]);
        if(result.affectedRows > 0){
            return res.status(201).json({msg:"Payment registered successfully",pasante});
        }
        res.status(400).json({msg:"Error creating payment"});
    }
    catch(error){
        console.error(error);
        res.status(500).json({msg:"Internal server error"});
    }
}

export async function getHoras(req,res){
    try{
        const sql = 'SELECT SUM(salario) AS total_salario, mes FROM horasmensuales WHERE fk_Pasantes = ? GROUP BY mes ORDER BY mes DESC';
        const { id } = req.body;
        const [valor] = await pool.query(sql,id);
        res.status(200).json(valor);
    }
    catch(error){
        console.error(error);
        res.status(500).json({msg:"Internal server error"});
    }
}