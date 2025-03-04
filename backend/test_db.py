import psycopg2
from sqlalchemy import create_engine, text
from sqlalchemy.exc import OperationalError

# Test direct psycopg2 connection
print("Testing psycopg2 connection...")
try:
    # Connect to PostgreSQL using psycopg2
    with psycopg2.connect("dbname=postgres user=postgres host=localhost") as conn:
        # Open a cursor to perform database operations
        with conn.cursor() as cur:
            # Execute a simple query
            cur.execute("SELECT version()")
            # Fetch the result
            version = cur.fetchone()[0]
            print(f"PostgreSQL version: {version}")
    print("Direct psycopg2 connection successful!")
except Exception as e:
    print(f"Error connecting with psycopg2: {e}")

# Test SQLAlchemy connection
print("\nTesting SQLAlchemy connection...")
try:
    # Create SQLAlchemy engine
    engine = create_engine("postgresql+psycopg2://postgres:postgres@localhost/postgres")
    
    # Test connection
    with engine.connect() as connection:
        result = connection.execute(text("SELECT version()"))
        version = result.fetchone()[0]
        print(f"PostgreSQL version via SQLAlchemy: {version}")
    print("SQLAlchemy connection successful!")
except OperationalError as e:
    print(f"SQLAlchemy connection error: {e}")
except Exception as e:
    print(f"Unexpected error: {e}") 