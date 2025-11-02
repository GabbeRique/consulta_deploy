const express = require('express');
const app = express();
const session = require('express-session');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const db = require('./config/database');
const path = require("path");

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('postgres://consultapeca_user:GDSqCmZUtIjVYty0VgsfcjOELQHKWjwk@dpg-d43rcjeuk2gs739e1750-a.oregon-postgres.render.com:5432/consultapeca', {
  dialect: 'postgres',
  protocol: 'postgres',
  logging: false,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  }
});

(async () => {
  try {
    await sequelize.authenticate();
    console.log('Conexão com o banco OK!');
  } catch (error) {
    console.error('Erro ao conectar:', error);
  }
})();



const Login = require('./model/login.model');
const equipamento = require('./model/equipamento.model');
const peca = require('./model/Peca.model'); // Corrigido o caminho
const login_white = require('./model/login_white.model');
const { EquipamentoWhite } = require('./model/equipamento_white.model');  // Corrigido o caminho aqui
const Peca_white = require('./model/peca_white.model'); // Corrigido o caminho
const login_br11 = require('./model/login_br11');
const login_br13 = require('./model/login_br13');
const login_predial = require('./model/login_predial');
const equipamento_br11 = require('./model/equipamento_br11');
const equipamento_br13 = require('./model/equipamento_br13');
const equipamento_predial = require('./model/equipamento_predial');
const peca_br11 = require('./model/peca_br11');
const peca_br13 = require('./model/peca_br13');
const peca_predial = require('./model/peca_predial');




app.use(express.static('public'));

app.set('views', path.join(__dirname, 'views'));


const favicon = require('serve-favicon');
app.use(favicon(path.join(__dirname, 'public', 'favicon_io', 'favicon.ico')));

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({
  secret: process.env.SESSION_SECRET || 'seuSegredoAqui',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: process.env.NODE_ENV === 'production' } // apenas https em prod
}));

app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');

async function testarConexao() {
    try {
        await db.authenticate();
        console.log('Conexão com o banco estabelecida com sucesso!');
    } catch (error) {
        console.error('Erro ao conectar ao banco:', error);
    }
}

async function sincronizarBD() {
    try {
        await db.sync({ force: false });
        console.log('Banco de dados sincronizado com sucesso!');
    } catch (error) {
        console.error('Erro ao sincronizar o banco:', error);
    }
}

testarConexao();
sincronizarBD();

// blacK
const indexFRoutes = require('./routes/index_funcionario');
const indexAdmRoutes = require('./routes/index_adm');
const loginRoutes = require('./routes/login');
const registerRoutes = require('./routes/register');
const addequipamentoRoutes = require('./routes/addEquipamento');
const addpecaRoutes = require('./routes/addPeca');
const tabelaPeca = require('./routes/tabelaPeca');
const tabelaEquipamento = require('./routes/tabelaEquipamento');
const delEquipamento = require('./routes/delEquipamento');
const delPeca = require('./routes/delPeca');
const telasBR = require('./routes/telasBR');
const telascor = require('./routes/telascor');
const editarEquipamento = require('./routes/editarEquipamento');


app.use('/editarEquipamento', editarEquipamento);
app.use('/tabelaPeca', tabelaPeca);
app.use('/tabelaEquipamento', tabelaEquipamento);
app.use('/', telasBR);
app.use('/telascor', telascor);
app.use('/index_funcionario', indexFRoutes);
app.use('/adm', indexAdmRoutes);
app.use('/login', loginRoutes);
app.use('/register', registerRoutes);
app.use('/addEquipamento', addequipamentoRoutes);
app.use('/addPeca', addpecaRoutes);
app.use('/delEquipamento', delEquipamento);
app.use('/delPeca', delPeca);

// white

const indexFWRoutes = require('./routes/index_funcionario_white');
const indexAdmWRoutes = require('./routes/index_adm_white');
const loginWRoutes = require('./routes/login_white');
const registerWRoutes = require('./routes/register_white');
const addequipamentoWRoutes = require('./routes/addEquipamento_white');
const addPecaRouter = require('./routes/addPeca_white');
const tabelaequipamentoWhite = require('./routes/tabelaEquipamento_white');
const tabelapecaWhite = require('./routes/tabelaPeca_white');
const delEquipamentoWhite = require('./routes/delEquipamento_white');
const delPecaw = require('./routes/delPeca_white');
const editarEquipamentoW = require('./routes/editarEquipamento_white');
const desenv  = require('./routes/desenv');

app.use('/addPeca_white', addPecaRouter);
app.use('/index_funcionario_white', indexFWRoutes);
app.use('/index_adm_white', indexAdmWRoutes);
app.use('/login_white', loginWRoutes);
app.use('/register_white', registerWRoutes); 
app.use('/addEquipamento_white', addequipamentoWRoutes);
app.use('/tabelaEquipamento_white', tabelaequipamentoWhite);
app.use('/tabelaPeca_white', tabelapecaWhite);
app.use('/delEquipamento_white', delEquipamentoWhite);
app.use('/delPeca_white', delPecaw);
app.use('/editarEquipamento_white', editarEquipamentoW);
app.use('/desenv', desenv);

// br 11

const indexF11Routes = require('./routes/index_funcionario_br11');
const indexAdm11Routes = require('./routes/index_adm_br11');
const login11Routes = require('./routes/login_br11');
const register11Routes = require('./routes/register_br11');
const addequipamento11Routes = require('./routes/addEquipamento_br11');
const addPeca11Router = require('./routes/addPeca_br11');
const tabelaPeca_br11 = require('./routes/tabelaPeca_br11');
const tabelaEquipamento_br11 = require('./routes/tabelaEquipamento_br11');
const delEquipamento11 = require('./routes/delEquipamento_br11');
const editarEquipamento_br11 = require('./routes/editarEquipamento_br11');
const delPeca11 = require('./routes/delPeca_br11');


app.use('/index_funcionario_br11', indexF11Routes);
app.use('/index_adm_br11', indexAdm11Routes);
app.use('/login_br11', login11Routes);
app.use('/register_br11', register11Routes);
app.use('/addEquipamento_br11', addequipamento11Routes);
app.use('/addPeca_br11', addPeca11Router);
app.use('/tabelaPeca_br11', tabelaPeca_br11);
app.use('/tabelaEquipamento_br11', tabelaEquipamento_br11);
app.use('/delEquipamento_br11', delEquipamento11);
app.use('/editarEquipamento_br11', editarEquipamento_br11);
app.use('/delPeca_br11', delPeca11);

// br 13

const indexF13Routes = require('./routes/index_funcionario_br13');
const indexAdm13Routes = require('./routes/index_adm_br13');
const login13Routes = require('./routes/login_br13');
const register13Routes = require('./routes/register_br13');
const addequipamento13Routes = require('./routes/addEquipamento_br13');
const addPeca13Router = require('./routes/addPeca_br13');
const tabelaPeca_br13 = require('./routes/tabelaPeca_br13');
const tabelaEquipamento_br13 = require('./routes/tabelaEquipamento_br13');
const delpeca13 = require('./routes/delPeca_br13');
const delEquipamento13 = require('./routes/delEquipamento_br13');
const editarEquipamento13 = require('./routes/editarEquipamento_br13');

app.use('/index_funcionario_br13', indexF13Routes);
app.use('/index_adm_br13', indexAdm13Routes);
app.use('/login_br13', login13Routes);
app.use('/register_br13', register13Routes);
app.use('/addEquipamento_br13', addequipamento13Routes);
app.use('/addPeca_br13', addPeca13Router);
app.use('/tabelaPeca_br13', tabelaPeca_br13);
app.use('/tabelaEquipamento_br13', tabelaEquipamento_br13);
app.use('/delPeca_br13', delpeca13);
app.use('/delEquipamento_br13', delEquipamento13);
app.use('/editarEquipamento_br13', editarEquipamento13);

// predial

const indexFpredialRoutes = require('./routes/index_funcionario_predial');
const indexAdmpredialRoutes = require('./routes/index_adm_predial');
const loginpredialRoutes = require('./routes/login_predial');
const registerpredialRoutes = require('./routes/register_predial');
const addequipamentopredialRoutes = require('./routes/addEquipamento_predial');
const addPecapredialRouter = require('./routes/addPeca_predial');
const tabelaPecapredial = require('./routes/tabelaPeca_predial');
const tabelaEquipamentopredial = require('./routes/tabelaEquipamento_predial');
const delPecapredial = require('./routes/delPeca_predial');
const delEquipamentopredial = require('./routes/delEquipamento_predial');
const editarEquipamentopredial = require('./routes/editarEquipamento_predial');


app.use('/index_funcionario_predial', indexFpredialRoutes);
app.use('/index_adm_predial', indexAdmpredialRoutes);
app.use('/login_predial', loginpredialRoutes);
app.use('/register_predial', registerpredialRoutes);
app.use('/addEquipamento_predial', addequipamentopredialRoutes);
app.use('/addPeca_predial', addPecapredialRouter);
app.use('/tabelaPeca_predial', tabelaPecapredial);
app.use('/tabelaEquipamento_predial', tabelaEquipamentopredial);
app.use('/delPeca_predial', delPecapredial);
app.use('/delEquipamento_predial', delEquipamentopredial);
app.use('/editarEquipamento_predial', editarEquipamentopredial);








// sistema 
app.use(express.urlencoded({ extended: true }));
app.use(express.json());




app.engine('handlebars', exphbs.engine({
    helpers: {
        ifCond: (val1, val2, options) => {
            return val1 === val2 ? options.fn(this) : options.inverse(this);
        }
    }
}));


app.set('view engine', 'handlebars');

app.use(express.static(path.join(__dirname, "public")));

// Usando method-override para suportar DELETE no formulário



// Rota para deletar o equipamento pelo nome


const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
