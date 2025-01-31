import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

const Verification = () => {
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();


  const goToHome = () => {
    navigate("/home"); 
  };


  // Function to get query parameters
  const getQueryParams = () => {
    const params = new URLSearchParams(location.search);
    return {
      token: params.get('token'),
    };
  };

  useEffect(() => {
    const { token } = getQueryParams();

    if (token) {
      fetch(`https://backendbook-bazl.onrender.com/user/verify?token=${token}`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Verification failed');
          }
          return response.json();
        })
        .then(() => {
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [location]);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1>Verification Process Completed</h1>
      <p>Please check your email for confirmation.</p>
      <button onClick={goToHome}>Go to Home</button>
    </div>
  );
};

export default Verification;