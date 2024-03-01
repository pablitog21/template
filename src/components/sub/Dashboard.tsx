// pages/Dashboard.js

const Dashboard = () => {
    return (
      <main className="flex-1 bg-gray-100">
        <div className="p-6">
          <h1 className="text-3xl font-semibold mb-8">Bienvenido a tu Dashboard</h1>
          <div className="mt-8">
            <img className="rounded-lg shadow-lg" src="https://source.unsplash.com/random/600x300" alt="Dashboard Image" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Example Card */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-lg font-semibold mb-2">Usuarios Activos</h2>
              <p className="text-gray-600">1000</p>
            </div>
            {/* Add more cards or elements here */}
          </div>
        </div>
      </main>
    );
  };
  
  export default Dashboard;
  