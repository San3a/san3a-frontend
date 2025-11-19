const TechnicianInformation = ({ user, imageDefault }) => {
  return (
    <>
      <img
        src={user?.profileImage?.url || imageDefault}
        alt="Technician"
        className="w-14 h-14 rounded-full object-cover border"
      />
      <div>
        <p className="font-medium text-gray-900 dark:text-gray-100">
          {user?.name}
        </p>
        <p className="text-gray-500 dark:text-gray-400 text-sm">
          {user?.phone}
        </p>
        <p className="text-gray-400 text-sm">{user?.email}</p>
      </div>
    </>
  );
};

export default TechnicianInformation;
